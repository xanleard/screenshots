import React, { useEffect, useState } from 'react';

import { Dropdown, PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../Services/restClient';

const acti = [{ key: 'true', text: 'Activo' }, { key: 'false', text: 'Inactivo' }];

export const UsuarioForm = ({ fetchUsuarios, usuarioSeleccionado, acccion, onDismiss }) => {
    const [usuario, setUsuario] = useState({
        usuarioId: acccion === 'Edit' ? usuarioSeleccionado.usuarioId :'',
        contrasenia: acccion === 'Edit' ? usuarioSeleccionado.contrasenia : '',
        estaActivo: acccion === 'Edit' ? usuarioSeleccionado.estaActivo : true,      
    });

    const [mensajeValidacion, setMensajeValidacion] = useState('');
    const [errorCampo, setErrorCampo] = useState({
        usuarioId: '',
        contrasenia:'',
        estaActivo:''
    });
    const [showSpinner, setShowSpinner] = useState(false);

    const handleTextFieldChange = prop => (event, value) => {
        setUsuario({ ...usuario, [prop]: value })
    }
    const handleSelectedActivoChange = (event, option) => {
        setUsuario({ ...usuario, estaActivo: option.key });
    }
    const validandoCampos = () => {
        let mensaje = {};

        if (!usuario.usuarioId) {
            mensaje = { ...mensaje, nombre: 'Ingrese Usuario' };
        }
        if (!usuario.contrasenia) {
            mensaje = { ...mensaje, nombre: 'Ingrese pass' };
        }
        if (!usuario.estaActivo) {
            mensaje = { ...mensaje, nombre: 'Ingrese tru' };
        }

        setErrorCampo(mensaje);

        return Object.keys(mensaje).length;
    }

    const handleGuardarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true); //activar spinner

        const response = await restClient.httpPost('/Usuario', usuario);

        if (typeof response === 'string') {
            setMensajeValidacion(response);
        }

        if (typeof response == "object") {
            setMensajeValidacion('Saved');

            fetchUsuarios();
        }

        setShowSpinner(false);
        onDismiss();
    }

    const handleEditarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const url = `/Usuario/${usuarioSeleccionado.usuarioId}`;
        const response = await restClient.httpPut(url, usuario);

        if (response === 'success') {
            setMensajeValidacion('Saved');

            fetchUsuarios();
        } else {
            setMensajeValidacion(response);
        }

        setShowSpinner(false);
        onDismiss();
    }

    return (
        <div>

            {showSpinner && <ProgressIndicator label="Guardando..." />}

            <TextField label="Usuario"
                value={usuario.usuarioId}
                onChange={handleTextFieldChange('usuarioId')}
                errorMessage={errorCampo.usuarioId} />

            <TextField label="Contraseña"
                value={usuario.contrasenia}
                onChange={handleTextFieldChange('contrasenia')}
                errorMessage={errorCampo.contrasenia} />

            <Dropdown label="Seleccione "
                options={acti}
                selectedKey={usuario.estaActivo}
                onChange={handleSelectedActivoChange}
                errorMessage={errorCampo.estaActivo} />
          
            <br />

            <PrimaryButton text="Guardar" onClick={acccion === 'New' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValidacion === 'Saved' ? 'green' : 'red' }}>{mensajeValidacion}</span>
        </div>
    )


}