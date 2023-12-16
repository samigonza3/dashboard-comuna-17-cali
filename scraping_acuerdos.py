import requests
from bs4 import BeautifulSoup

# URL base
url_base = 'https://www.concejodecali.gov.co/documentos/5008/acuerdos-2023/'
# Número de páginas a buscar
numero_paginas = 5  # Cambia esto al número deseado

# Lista para almacenar todos los enlaces con sus títulos
lista_enlaces = []

for pagina in range(1, numero_paginas + 1):
    # Construir la URL de la página actual
    url_pagina = f'{url_base}?page={pagina}'  # Ajusta esto según la estructura de la URL

    # Hacer la solicitud a la página
    response = requests.get(url_pagina)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Buscar enlaces y títulos
    divs_documentos = soup.find_all('div', class_='documentos')
    for div_documentos in divs_documentos:
        enlaces = div_documentos.find_all('a')
        titulos = div_documentos.find_all('strong', class_='nombre')
        for enlace, titulo in zip(enlaces, titulos):
            url_enlace = enlace.get('href')
            nombre_enlace = titulo.get_text(strip=True)
            lista_enlaces.append({'url': url_enlace, 'titulo': nombre_enlace})

# Escribir la lista de enlaces en un archivo JavaScript
with open('enlaces.js', 'w', encoding='utf-8') as archivo_js:
    archivo_js.write('const enlaces = ' + str(lista_enlaces))

print('Enlaces guardados en enlaces.js')
