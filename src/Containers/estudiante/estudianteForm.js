import React, { useEffect, useState } from 'react';

import { Dropdown, PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../Services/restClient';

const generos = [{ key: 'F', text: 'F' }, { key: 'M', text: 'M' }];

export const EstudianteForm = ({ fetchEstudiantes, estudianteSeleccionado, acccion, onDismiss }) => {
    const [estudiante, setEstudiante] = useState({
        id: acccion === 'Edit' ? estudianteSeleccionado.id : 0,
        nombre: acccion === 'Edit' ? estudianteSeleccionado.nombre : '',
        sexo: acccion === 'Edit' ? estudianteSeleccionado.sexo : '',
        edad: acccion === 'Edit' ? estudianteSeleccionado.edad : 0,
        cursoId: acccion === 'Edit' ? estudianteSeleccionado.cursoId : 0,
        profesorId: acccion === 'Edit' ? estudianteSeleccionado.profesorId : 0,
        paisHacerId: acccion === 'Edit' ? estudianteSeleccionado.paisHacerId : 0
    });

    const [mensajeValidacion, setMensajeValidacion] = useState('');
    const [errorCampo, setErrorCampo] = useState({
        nombre: '',
        sexo: '',
        edad: '',
        cursoId: '',
        profesorId: '',
        paisHacerId: ''
    });

    const [cursos, setCursos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const fetchCursos = async () => {
            const response = await restClient.httpGet('/curso');

            if (response && response.length) {
                setCursos(response.map(curso => ({
                    key: curso.id,
                    text: curso.nombre
                })))
            }
        }

        fetchCursos();
    }, []);
    const [profesores, setProfesores] = useState([]);
    useEffect(() => {
        const fetchProfesores = async () => {
            const response = await restClient.httpGet('/Profesor');

            if (response && response.length) {
                setProfesores(response.map(pro => ({
                    key: pro.id,
                    text: pro.nombre
                })))
            }
        }

        fetchProfesores();
    }, []);

    const [paisHacers, setPaisHacers] = useState([]);
    useEffect(() => {
        const fetchPaisHacers = async () => {
            const response = await restClient.httpGet('/paisHacer');

            if (response && response.length) {
                setPaisHacers(response.map(pro => ({
                    key: pro.id,
                    text: pro.nombre
                })))
            }
        }

        fetchPaisHacers();
    }, []);

    const handleTextFieldChange = prop => (event, value) => {
        setEstudiante({ ...estudiante, [prop]: value })
    }

    const handleSelectedCursoChange = (event, option) => {
        setEstudiante({ ...estudiante, cursoId: option.key });
    }

    const handleSelectedProfesorChange = (event, option) => {
        setEstudiante({ ...estudiante, profesorId: option.key });
    }
    const handleSelectedPaisChange = (event, option) => {
        setEstudiante({ ...estudiante, paisHacerId: option.key });
    }

    const handleSelectedSexoChange = (event, option) => {
        setEstudiante({ ...estudiante, sexo: option.key });
    }

    const validandoCampos = () => {
        let mensaje = {};

        if (!estudiante.nombre) {
            mensaje = { ...mensaje, nombre: 'Ingrese nombre' };
        }

        if (estudiante.edad < 18) {
            mensaje = { ...mensaje, edad: 'Edad debe sera mayor o igual a 18' };
        }

        if (!estudiante.sexo) {
            mensaje = { ...mensaje, sexo: 'Seleccione un genero...' };
        }

        if (!estudiante.cursoId) {
            mensaje = { ...mensaje, cursoId: 'Seleccione un curso...' };
        }
        if (!estudiante.profesorId) {
            mensaje = { ...mensaje, profesorId: 'Seleccione un Profesor...' };
        }
        if (!estudiante.paisHacerId) {
            mensaje = { ...mensaje, paisHacerId: 'Seleccione un Pais...' };
        }

        setErrorCampo(mensaje);

        return Object.keys(mensaje).length;
    }


    const handleGuardarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true); //activar spinner

        const response = await restClient.httpPost('/Estudiante', estudiante);

        if (typeof response === 'string') {
            setMensajeValidacion(response);
        }

        if (typeof response == "object") {
            setMensajeValidacion('Saved');

            fetchEstudiantes();
        }

        setShowSpinner(false);
        onDismiss();
    }

    const handleEditarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const url = `/Estudiante/${estudianteSeleccionado.id}`;

        const response = await restClient.httpPut(url, estudiante);

        if (response === 'success') {
            setMensajeValidacion('Saved');

            fetchEstudiantes();
        } else {
            setMensajeValidacion(response);
        }

        setShowSpinner(false);
        onDismiss();
    }

    return (
        <div>

            {showSpinner && <ProgressIndicator label="Guardando..." />}

            <TextField label="Nombre"
                value={estudiante.nombre}
                onChange={handleTextFieldChange('nombre')}
                errorMessage={errorCampo.nombre} />

            <TextField type="Number" label="Edad"
                value={estudiante.edad}
                onChange={handleTextFieldChange('edad')}
                errorMessage={errorCampo.edad} />

            <Dropdown label="Seleccione un curso"
                options={cursos}
                selectedKey={estudiante.cursoId}
                onChange={handleSelectedCursoChange}
                errorMessage={errorCampo.cursoId} />

            <Dropdown label="Seleccione un profesor"
                options={profesores}
                selectedKey={estudiante.profesorId}
                onChange={handleSelectedProfesorChange}
                errorMessage={errorCampo.cursoId} />

            <Dropdown label="Seleccione un pais"
                options={paisHacers}
                selectedKey={estudiante.paisHacerId}
                onChange={handleSelectedPaisChange}
                errorMessage={errorCampo.cursoId} />

            <Dropdown label="Seleccione un género"
                options={generos}
                selectedKey={estudiante.sexo}
                onChange={handleSelectedSexoChange}
                errorMessage={errorCampo.sexo} />

            <br />

            <PrimaryButton text="Guardar" onClick={acccion === 'New' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValidacion === 'Saved' ? 'green' : 'red' }}>{mensajeValidacion}</span>
        </div>
    )
}

