# Learn the aeronautical alphabet

Aprende el alfabeto aeronáutico de una manera interactiva 🎰

## 🏁 Configuración de compilación

```shell
# install dependencies
$ npm install

# serve with hot reload at localhost:3006
$ npm run start

# build for production and launch server
$ npm run build
```

## 👨🏻‍💻 Cómo funciona

### `Class Aeronautical`


Instanciar la clase `Aeronautical`. Esta clase recibe dos propiedades: `time` y `finished` callback.
- El `time` establece el intervalo de tiempo que durará el juego.
- El `finished` callback se ejecuta cuando el intervalo del tiempo a finalizado. Puede usar este método para agregar interacción.


```javascript
// Establecer la instancia
const aeronautical = new Aeronoutical({
  // Establece el tiempo de intervalo del juego
  time: 60000, // 1 minuto
  // Callback que se ejecuta cuando el juego a finalizado
  finished: (result) => {
    console.log("finished");
  },
});
```
### `play`

El método `play` inicia el juego si aun no se inicia o reinicia el juego si el juego ya habia iniciado. 

```javascript
// Evento para iniciar el juego
play.addEventListener("click", () => {
  const alphabet = aeronautical.play();
});
```

`play` retorna un objeto con la primera letra del alfabeto.
```javascript
{
  symbol: "a"
}
```

### `next`

El método `next` pasa el siguiente letra del alfabeto. 
```javascript
// Evento para pasar al siguiente letra
next.addEventListener("click", () => {
  const value = input.value;
  const alphabet = aeronautical.next(value);
});
```

`next` tambien retorna un objeto con la siguiente letra del alfabeto.

```javascript
{
  symbol: "b"
}
```
