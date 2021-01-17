import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '150%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)

  },
  delete: {
    backgroundColor: "red"
  }

}));

export default function ProyectoPrestamos() {
  const classes = useStyles();

  const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
    { defaultValues: { libro: "Seleccione Libro *", libroNombre: "Seleccione Libro *", idPersona: "Seleccione Persona *", persona: "Seleccione Persona *",fecha: "Fecha *" } });

  const [contador, setContador] = useState(0)
  const [libros, setLibros] = useState([])
  const [personas, setPersonas] = useState([])
  const [accion, setAccion] = useState("Guardar")
  const [idUsuario,setIdUsuario] = useState(null);

  useEffect(() => {
    cargarLibros();
    cargarPersonas();
    cargarFecha();
  }, []);

  const seleccionaLibro = (item) => {
    setValue("libro", item._id)
    setValue("libroNombre", item.nombre)
  }
  const seleccionaPersona = (item) => {
    setValue("idPersona", item._id)
    setValue("persona", item.nombre + ' ' + item.apellido)
  }

  const cargarFecha = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    setValue("fecha", today)
  }
  const columnsLibros = [
    {
        name: "Seleccionar",
        options: {
          headerNoWrap: true,
          customBodyRender: (item, tablemeta, update) => {
            return (
              <Button
                variant="contained"
                className="btn-block"
                onClick={() => seleccionaLibro(item)}
              >
                Seleccionar
              </Button>
            );
          },
        },
      },
    {
      name: 'Código',
      field: 'codigo'
    },
    {
      name: 'Título',
      field: 'nombre'
    }
  ];
  const columnsPersonas = [
    {
        name: "Seleccionar",
        options: {
          headerNoWrap: true,
          customBodyRender: (item, tablemeta, update) => {
            return (
              <Button
                variant="contained"
                className="btn-block"
                onClick={() => seleccionaPersona(item)}
              >
                Seleccionar
              </Button>
            );
          },
        },
      },
    {
      name: 'Nombre',
      field: 'nombre'
    },
    {
      name: 'Apellido',
      field: 'apellido'
    },
    {
        name: 'Rut',
        field: 'rut'
      }
  ];

  const options = {
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }
  const onSubmit = data => {
    if (accion == "Guardar") {
      console.log(data)
      axios
        .post("http://localhost:9000/api/prestamo", data)
        .then(
          (response) => {
            if (response.status == 200) {
              alert("Registro ok")
              cargarLibros();
              cargarPersonas();
              reset();
              cargarFecha();
            }
          },
          (error) => {
            // Swal.fire(
            //   "Error",
            //   "No es posible realizar esta acción: " + error.message,
            //   "error"
            // );
          }
        )
        .catch((error) => {
          // Swal.fire(
          //   "Error",
          //   "No cuenta con los permisos suficientes para realizar esta acción",
          //   "error"
          // );
          console.log(error);
        });
    }

  }

  
  const cargarLibros = async () => {
    // const { data } = await axios.get('/api/zona/listar');
    const { data } = await axios.get("http://localhost:9000/api/libro");
    setLibros(data.data);
  };

  const cargarPersonas = async () => {
    // const { data } = await axios.get('/api/zona/listar');
    const { data } = await axios.get("http://localhost:9000/api/personas");
    setPersonas(data.persona);
  };

  function click2() {
    setContador(contador + 1);
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        
          <Typography component="h1" variant="h5">
          Nuevo Préstamo
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="fecha"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
                id="fecha"
                label="Fecha"
                autoFocus
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="libroNombre"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
                id="libroNombre"
                label="Libro"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                autoComplete="fname"
                name="libro"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
                id="libro"
                label="ID"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
                id="persona"
                label="Persona"
                name="persona"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
                id="idPersona"
                label="ID"
                name="idPersona"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            

          </Grid>
        
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <MaterialDatatable
                title={"Seleccione Libro"}
                data={libros}
                columns={columnsLibros}
                options={options}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MaterialDatatable
                title={"Seleccione Persona"}
                data={personas}
                columns={columnsPersonas}
                options={options}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {accion}
          </Button>

        </form>

      </div>

    </Container>
  );
}