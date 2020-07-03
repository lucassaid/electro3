import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'
import AttachmentIcon from '@material-ui/icons/Attachment'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Chip from '@material-ui/core/Chip'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginBottom: '20px'
  },
  inputTypeFileLabel: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    backgroundColor: '#ddd',
    cursor: 'pointer',
    display: 'inline-flex'
  }
}))

const areas = [
  'General',
  'Redes y tecnología',
  'Compactación y reciclado',
  'Autopartes eléctricas',
  'Baterías',
  'Trabajá con nosotros'
]

function OptInForm({submitCV}) {
  const classes = useStyles()

  const INITIAL_STATE = {
    name: '',
    email: '',
    text: '',
    file: '',
    area: submitCV ? 'Trabajá con nosotros' : 'General'
  }

  const [inputs, setInputs] = useState(INITIAL_STATE)
  
  const handleInputChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setInputs({
      ...inputs,
      file
    })
  }

  const handleDeleteCV = () => {
    setInputs({
      ...inputs,
      file: ''
    })
  }

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs(INITIAL_STATE)
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    axios({
      method: 'POST',
      url: 'https://formspree.io/xdowwawl',
      data: inputs
    })
      .then(response => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.'
        )
      })
      .catch(error => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  if(status.submitting) return (
    <>'Enviando'</>
  )

  if(status.submitted) return (
    <>'Enviado'</>
  )

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        type="text"
        id="name"
        name="name"
        onChange={handleInputChange}
        label="Nombre y apellido"
        value={inputs.name}
        variant="outlined"
        required
        className={classes.formControl}
      />
      <TextField
        id="email"
        type="email"
        name="_replyto"
        onChange={handleInputChange}
        label="Email"
        value={inputs.email}
        variant="outlined"
        required
        className={classes.formControl}
      />
      
      {submitCV ? (
        <div className={classes.formControl}>
          {inputs.file != '' ? (
            <Chip
              icon={<AttachFileIcon/>}
              label={inputs.file.name}
              onDelete={handleDeleteCV}
            />
          ) : (
            <>
              <input
                id="newFile"
                hidden
                type="file"
                required
                value={inputs.file}
                className={classes.formControl}
                onChange={handleFileChange}
              />
              <label for="newFile" className={classes.inputTypeFileLabel}>
                <AttachmentIcon></AttachmentIcon>
                &nbsp;&nbsp;Subir CV
              </label>
            </>
          )}
        </div> 
      ) : (
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Área</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="message"
            name="message"
            value={inputs.area}
            onChange={handleInputChange}
            label="Área"
            className={classes.formControl}
            disabled={submitCV}
          >
            {areas.map(area =>
              <MenuItem key={area} value={area}>{area}</MenuItem>
            )}
          </Select>
        </FormControl>
      )}
      <TextField
        id="outlined-multiline-static"
        label="Consulta"
        multiline
        rows={3}
        variant="outlined"
        className={classes.formControl}
        onChange={handleInputChange}
      />
      <div className={classes.formControl} style={{textAlign: 'right'}}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        > 
          <SendIcon></SendIcon>
          <span>&nbsp;&nbsp;Enviar</span>
        </Button>
      </div>
    </form>    
  )
}

export default OptInForm