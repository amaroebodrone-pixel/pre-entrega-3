// =====================================================
// Simulador de Ahorro Personal
// Pre-Entrega 4: Uso e interacción con Arrays
// (continúa lo hecho en las pre-entregas 2 y 3)
// =====================================================


// ---------- CONSTANTES GLOBALES ----------
const MESES_POR_ANIO = 12;
const OPCION_SALIR = "9";


// ---------- ARRAY PRINCIPAL DEL SIMULADOR ----------
// Lista de metas de ahorro del usuario, ordenadas por prioridad:
// la primera (índice 0) es la más importante.
// Es const porque la variable siempre apunta al MISMO array,
// aunque su contenido cambie con push, unshift, pop, shift o splice.
const metasDeAhorro = [
    "Fondo de emergencia",
    "Curso de inglés",
    "Notebook",
    "Vacaciones",
    "Bicicleta"
];


// =====================================================
// FUNCIONES DE ENTRADA DE DATOS
// =====================================================

// FUNCIÓN DECLARADA: pide un texto que no puede quedar vacío.
function pedirTexto(mensaje) {
    let texto = prompt(mensaje);

    while (texto === null || texto.trim() === "") {
        alert("Este dato no puede quedar vacío. Intentá de nuevo.");
        texto = prompt(mensaje);
    }

    return texto;
}

// FUNCIÓN DECLARADA: pide un número mayor a 0.
function pedirNumeroPositivo(mensaje) {
    let numero;

    do {
        numero = parseFloat(prompt(mensaje));

        if (isNaN(numero)) {
            alert("Eso no es un número. Escribí solo números, sin $ ni puntos de miles.");
        } else if (numero <= 0) {
            alert("El número tiene que ser mayor a 0.");
        }
    } while (isNaN(numero) || numero <= 0);

    return numero;
}

// FUNCIÓN EXPRESADA: muestra el menú y devuelve la opción elegida.
const mostrarMenu = function (nombre, ahorroMensual) {
    return prompt(
        "MENÚ - ¿Qué querés hacer, " + nombre + "?\n" +
        "Ahorro actual: " + formatearPesos(ahorroMensual) + " por mes\n\n" +
        "--- AHORRO ---\n" +
        "1. Ver mi ahorro mes a mes durante un año\n" +
        "2. Calcular en cuántos meses llego a un monto\n" +
        "3. Cambiar mi ahorro mensual\n" +
        "--- MIS METAS ---\n" +
        "4. Ver mis metas\n" +
        "5. Agregar una meta\n" +
        "6. Buscar una meta\n" +
        "7. Cambiar una meta\n" +
        "8. Quitar una meta\n\n" +
        "9. Salir"
    );
};


// =====================================================
// FUNCIONES DE PROCESAMIENTO
// =====================================================

// FUNCIÓN FLECHA: agrega el signo $ a un monto.
const formatearPesos = (monto) => "$" + monto;

// FUNCIÓN FLECHA: calcula cuánto se junta en una cantidad de meses.
const calcularAhorroAcumulado = (ahorroMensual, meses) => ahorroMensual * meses;

// FUNCIÓN FLECHA: deja el texto con la primera letra en mayúscula y el resto en minúscula.
// Así "  VACACIONES " y "vacaciones" se guardan y se buscan igual: "Vacaciones".
const normalizarMeta = (texto) => texto.trim().charAt(0).toUpperCase() + texto.trim().slice(1).toLowerCase();

// FUNCIÓN EXPRESADA: devuelve los meses necesarios para llegar a un monto.
const calcularMesesParaMeta = function (meta, ahorroMensual) {
    let meses = 0;

    while (calcularAhorroAcumulado(ahorroMensual, meses) < meta) {
        meses++;
    }

    return meses;
};

// FUNCIÓN DECLARADA: pide un número de la lista (1, 2, 3...) y devuelve su ÍNDICE (0, 1, 2...).
// Si el número no existe en la lista, devuelve -1.
function pedirIndiceDeMeta(lista, mensaje) {
    const numero = parseInt(prompt(mensaje));

    if (isNaN(numero) || numero < 1 || numero > lista.length) {
        return -1;
    }

    return numero - 1; // los índices de un array empiezan en 0
}


// =====================================================
// FUNCIONES DE SALIDA (mostrar resultados)
// =====================================================

// FUNCIÓN DECLARADA: muestra el ahorro acumulado de cada mes del año.
function mostrarProyeccionAnual(ahorroMensual) {
    console.log("===== AHORRO MES A MES =====");

    for (let mes = 1; mes <= MESES_POR_ANIO; mes++) {
        const acumulado = calcularAhorroAcumulado(ahorroMensual, mes);

        if (mes === 6) {
            console.log("Mes " + mes + ": " + formatearPesos(acumulado) + "  <-- ¡Mitad de año!");
        } else if (mes === MESES_POR_ANIO) {
            console.log("Mes " + mes + ": " + formatearPesos(acumulado) + "  <-- ¡Total del año!");
        } else {
            console.log("Mes " + mes + ": " + formatearPesos(acumulado));
        }
    }

    const totalAnual = calcularAhorroAcumulado(ahorroMensual, MESES_POR_ANIO);
    alert("En un año vas a juntar " + formatearPesos(totalAnual) + ". Mirá el detalle mes a mes en la consola (F12).");
}

// FUNCIÓN DECLARADA: arma un mensaje según cuánto tiempo lleve llegar al monto.
function mostrarResultadoMeta(meta, meses) {
    const anios = Math.ceil(meses / MESES_POR_ANIO);
    let mensaje = "Llegás a " + formatearPesos(meta) + " en " + meses + " meses";

    if (meses <= MESES_POR_ANIO) {
        mensaje = mensaje + ". ¡En menos de un año! 🎉";
    } else if (meses <= MESES_POR_ANIO * 3) {
        mensaje = mensaje + " (unos " + anios + " años). ¡Se puede!";
    } else {
        mensaje = mensaje + " (unos " + anios + " años). Probá aumentar tu ahorro mensual.";
    }

    console.log(mensaje);
    alert(mensaje);
}

// FUNCIÓN DECLARADA: recorre el array con for...of y arma la lista numerada.
// Return: el texto de la lista, para poder mostrarlo también en un alert o prompt.
function listarMetas(lista) {
    let texto = "";
    let numero = 1;

    console.log("===== MIS METAS DE AHORRO =====");

    // for...of: recorre cada elemento del array, uno por uno
    for (const meta of lista) {
        const linea = numero + ". " + meta;
        console.log("Meta " + linea);
        texto = texto + linea + "\n";
        numero++;
    }

    console.log("Total: " + lista.length + " metas");
    return texto;
}

// FUNCIÓN DECLARADA: se despide del usuario.
function despedir(nombre) {
    console.log("El usuario " + nombre + " salió del simulador.");
    alert("¡Gracias por usar el simulador, " + nombre + "! Seguí ahorrando 💰");
}


// =====================================================
// FUNCIONES QUE TRABAJAN CON EL ARRAY DE METAS
// =====================================================

// AGREGAR: push (al final) o unshift (al principio, si es prioritaria)
function agregarMeta(lista) {
    const nuevaMeta = normalizarMeta(pedirTexto("¿Qué meta querés agregar? (ej: Auto, Mudanza)"));

    // includes: evitamos metas repetidas
    if (lista.includes(nuevaMeta)) {
        alert("La meta \"" + nuevaMeta + "\" ya está en tu lista.");
        return;
    }

    const esPrioritaria = prompt("¿Es tu meta más importante? (si / no)");

    if (esPrioritaria !== null && esPrioritaria.trim().toLowerCase() === "si") {
        lista.unshift(nuevaMeta); // entra al PRINCIPIO: es la prioridad número 1
        console.log("Meta agregada al principio (prioritaria): " + nuevaMeta);
        alert("\"" + nuevaMeta + "\" quedó como tu meta número 1.");
    } else {
        lista.push(nuevaMeta); // entra al FINAL de la lista
        console.log("Meta agregada al final: " + nuevaMeta);
        alert("\"" + nuevaMeta + "\" se agregó al final de tu lista.");
    }

    listarMetas(lista);
}

// BUSCAR: includes (¿existe?) + indexOf (¿en qué posición?)
function buscarMeta(lista) {
    const buscada = normalizarMeta(pedirTexto("¿Qué meta querés buscar?"));
    let mensaje;

    if (lista.includes(buscada)) {
        const indice = lista.indexOf(buscada);
        mensaje = "✅ \"" + buscada + "\" está en tu lista, en la posición " + (indice + 1) +
            " (índice " + indice + " del array).";
    } else {
        mensaje = "❌ \"" + buscada + "\" no está en tu lista de metas.";
    }

    console.log(mensaje);
    alert(mensaje);
}

// CAMBIAR: splice reemplaza el elemento de un índice concreto
function cambiarMeta(lista) {
    const listaTexto = listarMetas(lista);
    const indice = pedirIndiceDeMeta(lista, "¿Qué meta querés cambiar? Escribí su número:\n\n" + listaTexto);

    if (indice === -1) {
        alert("Ese número no está en la lista.");
        return;
    }

    const nuevaMeta = normalizarMeta(pedirTexto("¿Por cuál meta querés reemplazar \"" + lista[indice] + "\"?"));

    // splice(índice, 1, nuevoValor): borra 1 elemento en ese índice y pone el nuevo en su lugar.
    // Devuelve un array con lo que borró; tomamos su primer elemento con [0].
    const reemplazada = lista.splice(indice, 1, nuevaMeta)[0];

    console.log("Meta actualizada en el índice " + indice + ": \"" + reemplazada + "\" -> \"" + nuevaMeta + "\"");
    alert("Listo: \"" + reemplazada + "\" ahora es \"" + nuevaMeta + "\".");
    listarMetas(lista);
}

// QUITAR: pop (la última) o shift (la primera, cuando la cumpliste)
function quitarMeta(lista) {
    if (lista.length === 0) {
        alert("No tenés metas para quitar.");
        return;
    }

    const opcion = prompt(
        "¿Qué meta querés quitar?\n\n" +
        "1. ¡Cumplí mi meta prioritaria! (" + lista[0] + ")\n" +
        "2. La última de la lista (" + lista[lista.length - 1] + ")"
    );

    let eliminada;

    if (opcion === "1") {
        eliminada = lista.shift(); // saca el PRIMER elemento y lo devuelve
        alert("🎉 ¡Felicitaciones por cumplir tu meta! Se ha eliminado el elemento: " + eliminada);
    } else if (opcion === "2") {
        eliminada = lista.pop(); // saca el ÚLTIMO elemento y lo devuelve
        alert("Se ha eliminado el elemento: " + eliminada);
    } else {
        alert("Opción inválida. No se quitó ninguna meta.");
        return;
    }

    console.log("Se ha eliminado el elemento: " + eliminada);
    listarMetas(lista);
}


// =====================================================
// PROGRAMA PRINCIPAL: acá se INVOCAN las funciones
// =====================================================

const nombre = pedirTexto("¡Bienvenido al Simulador de Ahorro! ¿Cuál es tu nombre?");
let ahorroMensual = pedirNumeroPositivo(nombre + ", ¿cuánto podés ahorrar por mes? (ej: 15000)");

console.log("Usuario: " + nombre);
console.log("Ahorro mensual: " + formatearPesos(ahorroMensual));
listarMetas(metasDeAhorro);

let opcion = "";

while (opcion !== OPCION_SALIR) {
    opcion = mostrarMenu(nombre, ahorroMensual);

    switch (opcion) {
        case "1":
            mostrarProyeccionAnual(ahorroMensual);
            break;

        case "2": {
            const monto = pedirNumeroPositivo("¿Cuánto dinero querés juntar?");
            const meses = calcularMesesParaMeta(monto, ahorroMensual);
            mostrarResultadoMeta(monto, meses);
            break;
        }

        case "3": {
            const nuevoAhorro = pedirNumeroPositivo("¿Cuál es tu nuevo ahorro mensual?");
            console.log("Ahorro mensual actualizado: de " + formatearPesos(ahorroMensual) + " a " + formatearPesos(nuevoAhorro));
            ahorroMensual = nuevoAhorro;
            alert("¡Listo! Tu nuevo ahorro mensual es " + formatearPesos(ahorroMensual) + ".");
            break;
        }

        case "4":
            alert("Tus metas, de la más importante a la menos importante:\n\n" + listarMetas(metasDeAhorro));
            break;

        case "5":
            agregarMeta(metasDeAhorro);
            break;

        case "6":
            buscarMeta(metasDeAhorro);
            break;

        case "7":
            cambiarMeta(metasDeAhorro);
            break;

        case "8":
            quitarMeta(metasDeAhorro);
            break;

        case OPCION_SALIR:
            despedir(nombre);
            break;

        default:
            if (opcion === null) {
                opcion = OPCION_SALIR;
                despedir(nombre);
            } else {
                alert("Opción inválida. Elegí un número del 1 al 9.");
            }
    }
}
