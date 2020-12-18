import{Nav} from '@fluentui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Estudiante } from '../../Containers/estudiante';
import { Curso } from '../../Containers/curso';
import { Profesor } from '../../Containers/profesor';
import { Pais } from '../../Containers/pais';
import { Usuario } from '../../Containers/usuario';
import './container.css'
export const ContainerMain = () =>{
    return(
        <div className= "container">
            <Nav
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={{
                    root:{
                        width:210,
                        height:'100%',
                        boxSizing:'border-box',
                        border:'1px solid #eee',
                        overflow:'auto',
                    },
                }}
                groups={[{
                    links:[{
                        name:'Estudiantes',
                        url:'/estudiantes',
                        icon:'UserFollowed',
                        key:'estudiantesNav',
                    },
                    {
                        name:'Cursos',
                        url:'/cursos',
                        icon:'News',
                        key:'CursosNav',

                    },{
                        name:'Profesores',
                        url:'/Profesores',
                        icon:'News',
                        key:'ProfesoresNav',

                    },{
                        name:'Paises',
                        url:'/Paises',
                        icon:'News',
                        key:'PaisesNav',

                    },{
                        name:'Usuarios',
                        url:'/Usuarios',
                        icon:'News',
                        key:'UsuariosNav',

                    },]
                }]}
            
            
            />

            <Router>
                <Switch>
                    <Route exact path="/estudiantes" component={Estudiante}/>
                    <Route exact path="/cursos" component={Curso}/>
                    <Route exact path="/profesores" component={Profesor}/>
                    <Route exact path="/paises" component={Pais}/>
                    <Route exact path="/usuarios" component={Usuario}/>
                </Switch>
            </Router>
        </div>
    )
}