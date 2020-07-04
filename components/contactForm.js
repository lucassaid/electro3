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
import MuiAlert from '@material-ui/lab/Alert';

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
  // 'Trabajá con nosotros'
]

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function OptInForm({area}) {
  const classes = useStyles()

  const INITIAL_STATE = {
    area: area || 'General',
    nombre: '',
    email: '',
    mensaje: ''
  }

  const [inputs, setInputs] = useState(INITIAL_STATE)
  const [fileName, setFileName] = useState('')

  const handleInputChange = e => {
    console.log(e)
    const value = e.target.id == 'file' ? [e.target.files[0]] : e.target.value
    setInputs({
      ...inputs,
      [e.target.id]: value
    })
  }

  const handleFileChange = e => {
    handleInputChange(e)

    const file = e.target.files[0]
    setFileName(file.name)
  }

  const handleDeleteCV = () => {
    setInputs({
      ...inputs,
      file: {}
    })
    setFileName('')
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

  if(status.submitted) return (
    <Alert severity="success">Tu consulta ha sido enviada</Alert>
  )

  return (
    <form id="form" onSubmit={handleOnSubmit}>
      <TextField
        type="text"
        id="nombre"
        name="nombre"
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

      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Área</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="area"
          name="area"
          value={inputs.area}
          onChange={e => handleInputChange({target: {id: 'area', value: e.target.value}})}
          label="Área"
          className={classes.formControl}
        >
          {areas.map(area =>
            <MenuItem key={area} value={area}>{area}</MenuItem>
          )}
        </Select>
      </FormControl>
      
      {inputs.area == 'Trabajá con nosotros' && (
        <div className={classes.formControl}>
          <input
            id="cv"
            name="cv"
            type="file"
            hidden
            required
            className={classes.formControl}
            onChange={handleFileChange}
          />
          {fileName != '' ? (
            <Chip
              icon={<AttachFileIcon/>}
              label={fileName}
              onDelete={handleDeleteCV}
            />
          ) : (
            <>
              <label htmlFor="cv" className={classes.inputTypeFileLabel}>
                <AttachmentIcon></AttachmentIcon>
                &nbsp;&nbsp;Subir CV
              </label>
            </>
          )}
        </div> 
      )}

      <TextField
        id="mensaje"
        name="mensaje"
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
          disabled={status.submitting}
        > 
          <SendIcon></SendIcon>
          <span>&nbsp;&nbsp;{status.submitting ? 'Enviando' : 'Enviar'}</span>
        </Button>
      </div>

      <input type="hidden" name="_subject" value="Nueva consulta desde electro3.com.ar"></input>
    </form>    
  )
}

export default OptInForm