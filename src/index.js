const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const moment = require('moment');
const axios = require('axios');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/static', express.static(__dirname + '/sources'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/resumen/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const days = req.query.dias || 1;
        if ( isNaN(Date.parse(date)) ) {
            res.send({
                code: 400,
                message: "Por favor introduce una fecha válida"
            });

            return 0;
        }

        if ( !Number.isInteger(parseInt(days)) ) {
            res.send({
                code: 400,
                message: "La cantidad de días debe ser un número mayor a 0"
            });

            return 0;
        }
        
        const promises = [];
        for (let i = 0; i < days; i++) {
            const fecha = moment(date).add(i, 'days').format('YYYY-MM-DD');
            const url = `https://apirecruit-gjvkhl2c6a-uc.a.run.app/compras/${fecha}`;
          
            promises.push(axios.get(url));
        }
        
        const results = await Promise.all(promises);
        
        const data = results.map(result => {
            return result.data;
        });

        var finalData = {
            total: 0,
            comprasPorTDC: {},
            nocompraron: 0,
            compraMasAlta: 0
        };

        var compras = [];

        data.forEach(v => {
            v.forEach(value => {
                if (value.compro) {
                    finalData.total += value.monto;
                    compras.push(value.monto);
                    if (!finalData.comprasPorTDC[value.tdc]) {
                        finalData.comprasPorTDC[value.tdc] = 1;
                    } else {
                        finalData.comprasPorTDC[value.tdc] += 1;
                    }
                } else {
                    finalData.nocompraron += 1;
                }
            });
        });

        finalData.compraMasAlta = Math.max(...compras);
        
        res.json(finalData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});