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
  'Trabajá con nosotros'
]

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ContactForm({area}) {
  const classes = useStyles()

  const INITIAL_STATE = {
    area: area || 'General',
    name: '',
    email: '',
    message: '',
    files: []
  }

  const [inputs, setInputs] = useState(INITIAL_STATE)

  const handleInputChange = ({target}) => {
    const value = target.id == 'files' ? target.files : target.value
    setInputs({ ...inputs, [target.id]: value})
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
      // url: 'https://formspree.io/xdowwawl',
      url: '/api/contact',
      // headers: {
      //   // 'Accept': 'application/json, multipart/form-data, *',
      //   'Content-Type': 'multipart/form-data',
      // },
      // transformRequest: (data, request) => data, 
      data: new FormData(e.target)
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
        id="name"
        name="name"
        onChange={handleInputChange}
        label="Nombre y apellido"
        value={inputs.name}
        variant="outlined"
        required
        className={classes.formControl}
        autoComplete="name"
      />
      <TextField
        id="email"
        type="email"
        name="email"
        onChange={handleInputChange}
        label="Email"
        value={inputs.email}
        variant="outlined"
        required
        className={classes.formControl}
        autoComplete="email"
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
            id="files"
            name="cv"
            type="file"
            hidden
            required
            className={classes.formControl}
            onChange={handleInputChange}
          />
          {inputs.files.length ? (
            <Chip
              icon={<AttachFileIcon/>}
              label={inputs.files[0].name}
              onDelete={() => setInputs({ ...inputs, files: [] })}
            />
          ) : (
            <>
              <label htmlFor="files" className={classes.inputTypeFileLabel}>
                <AttachmentIcon></AttachmentIcon>
                &nbsp;&nbsp;Subir CV
              </label>
            </>
          )}
        </div> 
      )}

      <TextField
        id="message"
        name="message"
        label="Consulta"
        multiline
        rows={3}
        variant="outlined"
        className={classes.formControl}
        onChange={handleInputChange}
        value={inputs.message}
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

    </form>    
  )
}

export default ContactForm