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

interface TallerData {
  nombre: string;
  hombres: number;
  mujeres: number;
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const Grafico = () => {
  const [data, setData] = useState<BarChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alumnosRes, supergruposRes, subgruposRes, inscripcionesRes] = await Promise.all([
          fetch('https://drftallerotecdj.onrender.com/talleres/api/alumnos/').then(res => res.json()),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/').then(res => res.json()),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/').then(res => res.json()),
          fetch('https://drftallerotecdj.onrender.com/talleres/api/inscripciones/').then(res => res.json()),
        ]);

        // Filtrar inscripciones acreditadas
        const inscripcionesAcreditadas = inscripcionesRes.filter(
          (inscripcion: any) => inscripcion.estatus === 'Acreditado'
        );

        // Mapear subgrupos con sus nombres de taller correspondiente
        const subgruposConNombres = subgruposRes.map((subgrupo: any) => {
          const supergrupo = supergruposRes.find(
            (supergrupo: any) => supergrupo.id_taller_catalogo === subgrupo.id_taller_catalogo
          );
          return {
            ...subgrupo,
            nombre_taller: supergrupo?.nombre_taller || 'Taller desconocido',
          };
        });

        // Relacionar inscripciones con subgrupos y alumnos
        const talleresData = subgruposConNombres.map((subgrupo: any) => {
          const acreditados = inscripcionesAcreditadas.filter(
            (inscripcion: any) => inscripcion.id_taller_registro === subgrupo.id_taller_registro
          );

          const generoCount = acreditados.reduce(
            (acc: { hombres: number; mujeres: number }, inscripcion: any) => {
              const alumno = alumnosRes.find((al: any) => al.id_alumno === inscripcion.id_alumno);
              if (alumno) {
                if (alumno.genero === 'Masculino') acc.hombres += 1;
                if (alumno.genero === 'Femenino') acc.mujeres += 1;
              }
              return acc;
            },
            { hombres: 0, mujeres: 0 }
          );

          return {
            nombre: subgrupo.nombre_taller,
            ...generoCount,
          };
        });

        // Preparar datos para la gráfica
        const labels = talleresData.map((taller: TallerData) => taller.nombre);
        const hombresData = talleresData.map((taller: TallerData) => taller.hombres);
        const mujeresData = talleresData.map((taller: TallerData) => taller.mujeres);
        
        setData({
          labels,
          datasets: [
            {
              label: 'Acreditados Hombres',
              data: hombresData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Acreditados Mujeres',
              data: mujeresData,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Acreditados por Taller y Género',
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
          text: 'Número de Acreditados',
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

export default Grafico;
