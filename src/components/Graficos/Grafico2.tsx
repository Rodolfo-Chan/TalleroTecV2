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

// Define un tipo para los talleres
interface Talleres {
  [key: string]: number; // Permite que cualquier clave de tipo string tenga un valor de tipo number
}

const Grafico2 = () => {
  const [data, setData] = useState<BarChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const talleresData = [
        { carrera: 'Ingeniería', talleres: { 'Taller de Programación': 20, 'Taller de Diseño': 10, 'Taller de Fotografía': 5 } },
        { carrera: 'Diseño', talleres: { 'Taller de Programación': 5, 'Taller de Diseño': 25, 'Taller de Fotografía': 15 } },
        { carrera: 'Marketing', talleres: { 'Taller de Programación': 10, 'Taller de Diseño': 15, 'Taller de Fotografía': 20 } },
      ];

      const labels = ['Taller de Programación', 'Taller de Diseño', 'Taller de Fotografía'];

      const datasets = talleresData.map(carreraData => {
        const talleres = carreraData.talleres as Talleres; // Usa el tipo Talleres para la indexación
        return {
          label: carreraData.carrera,
          data: labels.map(taller => talleres[taller] || 0), // Cero si no hay datos
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`, // Color aleatorio
        };
      });

      setData({
        labels,
        datasets,
      });
    };

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Preferencias de Talleres por Carrera',
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
