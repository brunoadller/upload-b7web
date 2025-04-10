"use client"
import React, { ChangeEvent, useState } from 'react'

const Form = () => {
    const [legendField, setLegendField] = useState("")
    const [selectedFile, setSelectedFile] = useState<File>()
    const [prgressUpload, setProgressUpload] = useState(0)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
           setSelectedFile(file)

        }
    }

    const handleSubmit = async () => {
        if(selectedFile){
            const formData = new FormData()
            //nome do arquivo e da onde virá o arquivo
            formData.append('file', selectedFile)
            //adicionando otro dados para enviar unto com formdata
            formData.append('legend', legendField)
            

            const url = 'https://b7web.com.br/uploadtest/'
            const req = await axios.post(url, formData, {
              onUploadProgress: (progressEvent: ProgressEvent) => {
                if(progressEvent){
                  const pct = progressEvent.loaded / progressEvent.total
                  setProgressUpload(pct)
                }
              }
            })
            console.log(req.data)
        }
    }
  return (
    <div>
      <input 
      onChange={handleFileChange}
      className='block my file:bg-amber-400 file:p-2 file:rounded-2xl m-3' type="file"  />

      <input 
      type="text" 
      className='block my-3'
      placeholder='Digite uma legenda'
      value={legendField}
      onChange={e => setLegendField(e.target.value)}
      />
      <button onClick={handleSubmit}  className='block my-3'>Enviar</button>
    </div>
  )
}

export default Form
