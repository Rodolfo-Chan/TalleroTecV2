import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import styles from './Grafico.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const Grafico2 = () => {
  const [data, setData] = useState<BarChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar las llamadas a las APIs
        const [alumnosRes, supergruposRes, subgruposRes, inscripcionesRes] = await Promise.all([
          fetch('https://drftallerotecdj.onrender.com/talleres/api/alumnos/'),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/'),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/'),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/inscripciones/'),
        ]);

        const alumnos = await alumnosRes.json();
        const supergrupos = await supergruposRes.json();
        const subgrupos = await subgruposRes.json();
        const inscripciones = await inscripcionesRes.json();

        // Filtrar los alumnos acreditados
        const acreditados = inscripciones.filter((i: any) => i.estatus === 'Acreditado');

        // Vincular los datos de alumnos, talleres y carreras
        const talleresMap = supergrupos.reduce((map: any, t: any) => {
          map[t.id_taller_catalogo] = t.nombre_taller;
          return map;
        }, {});

        const subgruposMap = subgrupos.reduce((map: any, s: any) => {
          map[s.id_taller_registro] = talleresMap[s.id_taller_catalogo];
          return map;
        }, {});

        const alumnosPorTallerYCarrera = acreditados.reduce((result: any, acreditado: any) => {
          const alumno = alumnos.find((a: any) => a.id_alumno === acreditado.id_alumno);
          const taller = subgruposMap[acreditado.id_taller_registro];

          if (alumno && taller) {
            if (!result[taller]) result[taller] = {};
            if (!result[taller][alumno.carrera]) result[taller][alumno.carrera] = 0;
            result[taller][alumno.carrera]++;
          }
          return result;
        }, {});

        const labels = Object.keys(alumnosPorTallerYCarrera);
        const carreras = Array.from(
          new Set(
            Object.values(alumnosPorTallerYCarrera).flatMap((carreraData: any) =>
              Object.keys(carreraData)
            )
          )
        );

        // lista de colores fijos
        const fixedColors = [
          'rgba(255, 99, 132, 0.6)',  // Color 1
          'rgba(54, 162, 235, 0.6)',  // Color 2
          'rgba(255, 206, 86, 0.6)',  // Color 3
          'rgba(75, 192, 192, 0.6)',  // Color 4
          'rgba(153, 102, 255, 0.6)', // Color 5
        ];

        const datasets = carreras.map((carrera, index) => ({
          label: carrera,
          data: labels.map((taller) => alumnosPorTallerYCarrera[taller][carrera] || 0),
          backgroundColor: fixedColors[index % fixedColors.length], 
        }));

        setData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Número de Alumnos Acreditados por Taller y Carrera',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Alumnos',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Talleres',
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Grafico2;
