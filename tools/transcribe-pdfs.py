import os
from PyPDF2 import PdfReader

# [--- CONFIGURE ME!!! ---]

# Directory where your PDFs are stored
pdf_directory = ''
# Directory where you want to save the text files
output_directory = ''

# [--- END CONFIG ---]

if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Iterate over all PDF files in the directory
for filename in os.listdir(pdf_directory):
    if filename.endswith('.pdf'):
        # Open the PDF
        pdf_path = os.path.join(pdf_directory, filename)
        reader = PdfReader(pdf_path)

        # Create a text file for each PDF
        text_filename = os.path.splitext(filename)[0] + '.txt'
        text_path = os.path.join(output_directory, text_filename)

        with open(text_path, 'w', encoding='utf-8') as text_file:
            # Extract text from each page of the PDF
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    text_file.write(text)

        print(f"Converted {filename} to {text_filename}")

print("Conversion complete.")
