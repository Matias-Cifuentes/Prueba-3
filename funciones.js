import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const alumno = {
                'run': document.getElementById('run').value,
                'nom': document.getElementById('nombre').value,
                'ape': document.getElementById('apellido').value,
                'fecha': document.getElementById('fecha').value,
                'asig': document.getElementById('asig').value,
                'fapoderado': document.getElementById('fapoderado').value,
                'matricula': document.getElementById('matricula').value
            }
            save(alumno)
            limpiar()
        }else{
            const alumno = {
                'run': document.getElementById('run').value,
                'nom': document.getElementById('nombre').value,
                'ape': document.getElementById('apellido').value,
                'fecha': document.getElementById('fecha').value,
                'asig': document.getElementById('asig').value,
                'fapoderado': document.getElementById('fapoderado').value,
                'matricula': document.getElementById('matricula').value
            }
            update(id,alumno)
            limpiar()
            id = 0
        }
    }
})
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.ape}</td>
            <td>${item.fecha}</td>
            <td>${item.asig}</td>
            <td>${item.fapoderado}</td>
            <td>${item.matricula}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar los datos?",
                    text: "No se podran revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Delete"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('run').value = d.run
                document.getElementById('nombre').value = d.nom
                document.getElementById('apellido').value = d.ape
                document.getElementById('fecha').value = d.fecha
                document.getElementById('asig').value = d.asig
                document.getElementById('fapoderado').value = d.fapoderado
                document.getElementById('matricula').value = d.matricula
                document.getElementById('btnGuardar').value = 'Modificar'
                id = btn.id
            })
        })

    })
})