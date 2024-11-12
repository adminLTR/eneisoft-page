import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import pandas as pd
import time

# Configuración de SMTP
smtp_server = 'smtp.gmail.com'
smtp_port = 587
eneisoft_email = 'eneisoft.pe@gmail.com'  # Reemplaza por el email oficial de ENEISOFT
password = 'Eneisoft2024'  # Reemplaza con la contraseña del correo oficial

# Plantilla del correo
def generar_mensaje(nombre, premio, auspiciado, correo_auspiciado):
    return f"""
Estimado {nombre},

Nos dirigimos a ti para confirmar los detalles del premio {premio} que ganaste, auspiciado por {auspiciado} y sorteado durante el evento ENEISOFT 2024. 🎉
Para hacer efectivo tu premio, hemos enviado tus datos a {auspiciado} ({correo_auspiciado}). Por favor, comunícate con ellos directamente para coordinar los pasos necesarios.
Si tienes alguna pregunta o necesitas más información adicional, no dudes en contactarnos en eneisoft.pe@gmail.com o por teléfono al 941 831 923.
¡Felicitaciones nuevamente, {nombre}! 🎓 Nos alegra acompañarte en este importante paso de tu formación profesional.

Atentamente,
Equipo Organizador ENEISOFT 2024
eneisoft.pe@gmail.com
"""

# Envío de correos electrónicos
def enviar_correo(destinatario, nombre, premio, auspiciado, correo_auspiciado):
    mensaje = MIMEMultipart()
    mensaje['From'] = eneisoft_email
    mensaje['To'] = destinatario
    mensaje['Subject'] = "🎉 ¡Ganadores de las Becas en ENEISOFT 2024!"
    cuerpo = generar_mensaje(nombre, premio, auspiciado, correo_auspiciado)
    mensaje.attach(MIMEText(cuerpo, 'plain'))

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