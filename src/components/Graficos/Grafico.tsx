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
import styles from './Grafico.module.css'; // Importa tus estilos CSS

// Registra los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define el tipo de los datos del gráfico
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
      const talleresData = [
        { nombre: 'Taller de Programación', hombres: 15, mujeres: 10 },
        { nombre: 'Taller de Diseño', hombres: 8, mujeres: 7 },
        { nombre: 'Taller de Fotografía', hombres: 12, mujeres: 3 },
        { nombre: 'Taller de Marketing', hombres: 20, mujeres: 10 },


        
      ];

      const labels = talleresData.map(taller => taller.nombre);
      const hombresData = talleresData.map(taller => taller.hombres);
      const mujeresData = talleresData.map(taller => taller.mujeres);

      setData({
        labels,
        datasets: [
          {
            label: 'Acreditados Hombres',
            data: hombresData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color para hombres
          },
          {
            label: 'Acreditados Mujeres',
            data: mujeresData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color para mujeres
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Acreditados por Taller y Género', // Título del gráfico
        font: {
          size: 20, // Tamaño de fuente
          weight: 'bold', // Grosor de la fuente
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
