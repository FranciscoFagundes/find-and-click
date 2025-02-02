import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import useImage from 'use-image';
import { motion } from 'framer-motion';

const objectsToFind = [
  { id: 1, name: 'pessoa01', x: 631, y: 279, src: '/assets/images/pessoa01.png' },
  { id: 2, name: 'pessoa02', x: 668, y: 593, src: '/assets/images/pessoa02.png' },
  { id: 3, name: 'pessoa03', x: 117, y: 150, src: '/assets/images/pessoa03.png' },
  { id: 4, name: 'pessoa04', x: 1040, y: 59, src: '/assets/images/pessoa04.png' },
  { id: 5, name: 'pessoa05', x: 144, y: 348, src: '/assets/images/pessoa05.png' }
];

const HiddenObject = ({ x, y, src, found, onClick }) => {
  const [image] = useImage(src);

  return (
    <>
      <KonvaImage image={image} x={x} y={y} width={50} onClick={onClick} />
      {found && (
        <>
          {/* Linha diagonal para formar o "X" */}
          <Line points={[x, y, x + 50, y + 50]} stroke="red" strokeWidth={5} />
          <Line points={[x + 50, y, x, y + 50]} stroke="red" strokeWidth={5} />
        </>
      )}
    </>
  );
};

const Home = () => {
  const [foundObjects, setFoundObjects] = useState([]);
  const [backgroundImage] = useImage('/assets/images/wheres_waldo.png');

  const handleObjectClick = (id) => {
    if (!foundObjects.includes(id)) {
      setFoundObjects([...foundObjects, id]);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: 20, backgroundColor: 'black' }}>
      <h1 style={{ color: 'white', marginTop: 50 }}>Ache os Personagens</h1>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {objectsToFind.map((obj) => (
            <div
              key={obj.id}
              style={{
                width: 50,
                height: 50,
                backgroundImage: `url(${obj.src})`,
                backgroundSize: 'cover',
                opacity: foundObjects.includes(obj.id) ? 0.5 : 1,
                filter: foundObjects.includes(obj.id) ? 'grayscale(100%)' : 'none',
              }}
            ></div>
          ))}
        </div>
        <p style={{ color: 'white' }}>
          Personagens encontrados: {foundObjects.length} / {objectsToFind.length}
        </p>
      </motion.div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          width: '100%',
          margin: 'auto',
        }}
      >
        <Stage width={1200} height={675}>
          <Layer>
            {backgroundImage && (
              <KonvaImage image={backgroundImage} x={0} y={0} width={1200} height={675} />
            )}
            {objectsToFind.map((obj) => (
              <HiddenObject
                key={obj.id}
                x={obj.x}
                y={obj.y}
                src={obj.src}
                found={foundObjects.includes(obj.id)}
                onClick={() => handleObjectClick(obj.id)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Home;
