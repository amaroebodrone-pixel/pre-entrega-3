// =====================================================
// Pre-Entrega 3: Funciones e Integración de Lógica
// Simulador de Ahorro Personal
// =====================================================


// ---------- CONSTANTES GLOBALES ----------
// Están fuera de las funciones (scope global), así todas las funciones pueden usarlas.
const MESES_POR_ANIO = 12;
const OPCION_SALIR = "4";


// =====================================================
// FUNCIONES DE ENTRADA DE DATOS
// =====================================================

// FUNCIÓN DECLARADA
// Parámetro: el mensaje que se le muestra al usuario.
// Return: el texto ingresado (nunca vacío).
function pedirTexto(mensaje) {
    let texto = prompt(mensaje);

    // Repite mientras el usuario deje el campo vacío o toque "Cancelar"
    while (texto === "" || texto === null) {
        alert("Este dato no puede quedar vacío. Intentá de nuevo.");
        texto = prompt(mensaje);
    }

    return texto;
}

// FUNCIÓN DECLARADA
// Parámetro: el mensaje que se le muestra al usuario.
// Return: un número mayor a 0.
function pedirNumeroPositivo(mensaje) {
    let numero;

    // do...while: pregunta al menos una vez y repite hasta que el número sea válido
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

// FUNCIÓN EXPRESADA (guardada en una constante)
// Parámetros: el nombre del usuario y su ahorro mensual actual.
// Return: la opción elegida en el menú (como texto).
const mostrarMenu = function (nombre, ahorroMensual) {
    return prompt(
        "MENÚ - ¿Qué querés hacer, " + nombre + "?\n" +
        "Ahorro actual: " + formatearPesos(ahorroMensual) + " por mes\n\n" +
        "1. Ver mi ahorro mes a mes durante un año\n" +
        "2. Calcular en cuántos meses llego a una meta\n" +
        "3. Cambiar mi ahorro mensual\n" +
        "4. Salir"
    );
};


// =====================================================
// FUNCIONES DE PROCESAMIENTO
// =====================================================

// FUNCIÓN FLECHA: agrega el signo $ a un monto.
const formatearPesos = (monto) => "$" + monto;

// FUNCIÓN FLECHA: calcula cuánto se junta en una cantidad de meses.
const calcularAhorroAcumulado = (ahorroMensual, meses) => ahorroMensual * meses;

// FUNCIÓN EXPRESADA
// Parámetros: la meta a alcanzar y el ahorro mensual.
// Return: la cantidad de meses necesarios para llegar a la meta.
const calcularMesesParaMeta = function (meta, ahorroMensual) {
    let meses = 0;

    // while: no sabemos cuántas vueltas va a dar, depende de la meta
    while (calcularAhorroAcumulado(ahorroMensual, meses) < meta) {
        meses++;
    }

    return meses;
};


// =====================================================
// FUNCIONES DE SALIDA (mostrar resultados)
// =====================================================

// FUNCIÓN DECLARADA
// Parámetro: el ahorro mensual.
// Muestra en consola el ahorro acumulado de cada mes del año.
function mostrarProyeccionAnual(ahorroMensual) {
    console.log("===== AHORRO MES A MES =====");

    // for: sabemos que son exactamente 12 repeticiones
    for (let mes = 1; mes <= MESES_POR_ANIO; mes++) {
        const acumulado = calcularAhorroAcumulado(ahorroMensual, mes);

        // Condicional DENTRO del bucle: destacamos la mitad y el final del año
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

// FUNCIÓN DECLARADA
// Parámetros: la meta y la cantidad de meses calculada.
// Arma un mensaje distinto según cuánto tiempo lleve y lo muestra.
function mostrarResultadoMeta(meta, meses) {
    const anios = Math.ceil(meses / MESES_POR_ANIO);
    let mensaje = "Llegás a tu meta de " + formatearPesos(meta) + " en " + meses + " meses";

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

// FUNCIÓN DECLARADA
// Parámetro: el nombre del usuario.
function despedir(nombre) {
    console.log("El usuario " + nombre + " salió del simulador.");
    alert("¡Gracias por usar el simulador, " + nombre + "! Seguí ahorrando 💰");
}


// =====================================================
// PROGRAMA PRINCIPAL: acá se INVOCAN las funciones
// =====================================================

// 1. Entrada de datos
const nombre = pedirTexto("¡Bienvenido al Simulador de Ahorro! ¿Cuál es tu nombre?");
let ahorroMensual = pedirNumeroPositivo(nombre + ", ¿cuánto podés ahorrar por mes? (ej: 15000)");

console.log("Usuario: " + nombre);
console.log("Ahorro mensual: " + formatearPesos(ahorroMensual));

// 2. Menú: se repite hasta que el usuario elija Salir
let opcion = "";

while (opcion !== OPCION_SALIR) {
    opcion = mostrarMenu(nombre, ahorroMensual);

    switch (opcion) {
        case "1":
            mostrarProyeccionAnual(ahorroMensual);
            break;

        case "2": {
            const meta = pedirNumeroPositivo("¿Cuánto dinero querés juntar? (tu meta)");
            const meses = calcularMesesParaMeta(meta, ahorroMensual); // usamos el valor que RETORNA
            mostrarResultadoMeta(meta, meses);
            break;
        }

        case "3": {
            const nuevoAhorro = pedirNumeroPositivo("¿Cuál es tu nuevo ahorro mensual?");
            console.log("Ahorro mensual actualizado: de " + formatearPesos(ahorroMensual) + " a " + formatearPesos(nuevoAhorro));
            ahorroMensual = nuevoAhorro;
            alert("¡Listo! Tu nuevo ahorro mensual es " + formatearPesos(ahorroMensual) + ".");
            break;
        }

        case OPCION_SALIR:
            despedir(nombre);
            break;

        default:
            // Si toca "Cancelar" en el menú, prompt devuelve null: lo tomamos como salir
            if (opcion === null) {
                opcion = OPCION_SALIR;
                despedir(nombre);
            } else {
                alert("Opción inválida. Elegí un número del 1 al 4.");
            }
    }
}
