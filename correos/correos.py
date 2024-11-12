import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import pandas as pd
import time

# Configuración de SMTP
smtp_server = 'smtp.gmail.com'
smtp_port = 587
eneisoft_email = 'joselatorre143351@gmail.com'  # Reemplaza por el email oficial de ENEISOFT
password = 'zlfi vlub vtfb nfbt'  # Reemplaza con la contraseña del correo oficial

# Plantilla del correo
def generar_mensaje(nombre, premio, auspiciado, correo_auspiciado):
    return f"""
<html>
    <body>
        <p>Estimado <strong>{nombre}</strong>,</p>
        <p>
            Nos dirigimos a ti para confirmar los detalles del premio <strong>{premio}</strong> que ganaste,
            auspiciado por <strong>{auspiciado}</strong> y sorteado durante el evento ENEISOFT 2024. 🎉
        </p>
        <p>
            Para hacer efectivo tu premio, hemos enviado tus datos a <strong>{auspiciado}</strong> 
            (<a href="mailto:{correo_auspiciado}">{correo_auspiciado}</a>).
            Por favor, comunícate con ellos directamente para coordinar los pasos necesarios.
        </p>
        <p>
            Si tienes alguna pregunta o necesitas más información adicional, no dudes en contactarnos en 
            <a href="mailto:eneisoft.pe@gmail.com">eneisoft.pe@gmail.com</a> o por teléfono al 941 831 923.
        </p>
        <p>
            ¡Felicitaciones nuevamente, <strong>{nombre}</strong>! 🎓 Nos alegra acompañarte en este importante paso de tu formación profesional.
        </p>
        <p>Atentamente,<br>Equipo Organizador ENEISOFT 2024<br>eneisoft.pe@gmail.com</p>
    </body>
    </html>
"""

# Envío de correos electrónicos
def enviar_correo(destinatario, nombre, premio, auspiciado, correo_auspiciado):
    mensaje = MIMEMultipart()
    mensaje['From'] = eneisoft_email
    mensaje['To'] = destinatario
    mensaje['Subject'] = "🎉 ¡Ganadores de las Becas en ENEISOFT 2024!"
    cuerpo = generar_mensaje(nombre, premio, auspiciado, correo_auspiciado)
    mensaje.attach(MIMEText(cuerpo, 'html'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(eneisoft_email, password)
            server.sendmail(eneisoft_email, destinatario, mensaje.as_string())
        print(f"Correo enviado a {nombre} ({destinatario})")
    except Exception as e:
        print(f"Error al enviar correo a {nombre} ({destinatario}): {e}")

# Iterar sobre el DataFrame y enviar correos
df = pd.read_excel('SORTEO ASISTENTES - copia.xlsx')

for index, row in df.iterrows():
    enviar_correo(
        destinatario=row['CORREO'].strip(),
        nombre=str(row['NOMBRES']).split(',')[-1].strip(),
        premio=row['PREMIO'].strip(),
        auspiciado=row['AUSPICIADO'].strip(),
        correo_auspiciado=row['CORREO_AUSPICIADO'].strip()
    )
    time.sleep(120)