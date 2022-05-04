import path from 'path'

import fileUpload from 'express-fileupload'
import { v4 } from 'uuid'

/* Esta función necesita un archivo, una lista de
 extensiones permitidas y el nombre de la
 carpeta a almacenar Ejem: ../uploads/directoryName
*/
const uploadFile = async (
  files: fileUpload.FileArray,
  validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  directoryName: string = ''
) => {
  return new Promise<string>((resolve, reject) => {
    // Cargar un solo archivo y darle tipado
    const singleFile = files?.file as fileUpload.UploadedFile

    // Obtener la extensión del archivo
    const cutName = singleFile.name.split('.')
    const extensionFile = cutName[cutName.length - 1]

    // Condición que valida si el archivo cumple con las extensiones permitidas
    if (!validExtensions.includes(extensionFile)) {
      /* eslint-disable prefer-promise-reject-errors */
      return reject(new Error(`Only ${validExtensions.join(', ')} are accepted`))
    }

    // Generar identificador único para el nombre del archivo con su extension
    const temporalFileName = v4() + '.' + extensionFile

    // Construir la ruta de guardado
    const uploadPath = path.join(__dirname, '../uploads/', directoryName, temporalFileName)

    // Mover el archivo a la ruta construida
    singleFile?.mv(uploadPath, (err) => {
      if (err) {
        return reject(new Error(err))
      }

      resolve(temporalFileName)
      // res.json({ msg: 'File uploaded to ' + uploadPath })
    })
  })
}

export {
  uploadFile
}
