import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import useImage from 'use-image';
import { motion } from 'framer-motion';

const objectsToFind = [
  { id: 1, name: 'pessoa01', x: 631, y: 279, src: '/assets/images/pessoa01.png' },
  { id: 2, name: 'pessoa02', x: 668, y: 593, src: '/assets/images/pessoa02.png' },
  { id: 3, name: 'pessoa03', x: 117, y: 150, src: '/assets/images/pessoa03.png' },
  { id: 4, name: 'pessoa04', x: 1040, y: 59, src: '/assets/images/pessoa04.png' },
  { id: 5, name: 'pessoa05', x: 144, y: 348, src: '/assets/images/pessoa05.png' },
  { id: 6, name: 'pessoa06', x: 457, y: 516, src: '/assets/images/pessoa06.png' },
  { id: 7, name: 'pessoa07', x: 1032, y: 593, src: '/assets/images/pessoa07.png' },
  { id: 8, name: 'pessoa08', x: 760, y: 300, src: '/assets/images/pessoa08.png' },
  { id: 9, name: 'pessoa09', x: 1108, y: 74, src: '/assets/images/pessoa09.png' },
  { id: 10, name: 'pessoa10', x: 194, y: 28, src: '/assets/images/pessoa10.png' },
  { id: 11, name: 'pessoa11', x: 938, y: 8, src: '/assets/images/pessoa11.png' },
  { id: 12, name: 'pessoa12', x: 1012, y: 336, src: '/assets/images/pessoa12.png' },
  { id: 13, name: 'pessoa13', x: 1150, y: 625, src: '/assets/images/pessoa13.png' },
  { id: 14, name: 'pessoa14', x: 50, y: 20, src: '/assets/images/pessoa14.png' },
  { id: 15, name: 'pessoa15', x: 1026, y: 154, src: '/assets/images/pessoa15.png' },
  { id: 16, name: 'pessoa16', x: 844, y: 210, src: '/assets/images/pessoa16.png' },
  { id: 17, name: 'pessoa17', x: 196, y: 284, src: '/assets/images/pessoa17.png' },
  { id: 18, name: 'pessoa18', x: 22, y: 510, src: '/assets/images/pessoa18.png' },
  { id: 19, name: 'pessoa19', x: 392, y: 402, src: '/assets/images/pessoa19.png' },
  { id: 20, name: 'pessoa20', x: 187, y: 230, src: '/assets/images/pessoa20.png' },
];

const getRandomObjects = () => {
  const shuffled = [...objectsToFind].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

const HiddenObject = ({ x, y, src, found, onClick }) => {
  const [image] = useImage(src);

  return (
    <>
      <KonvaImage image={image} x={x} y={y} width={50} onClick={onClick} />
      {found && (
        <>
          <Line points={[x, y, x + 50, y + 50]} stroke="red" strokeWidth={5} />
          <Line points={[x + 50, y, x, y + 50]} stroke="red" strokeWidth={5} />
        </>
      )}
    </>
  );
};

const Home = () => {
  const [foundObjects, setFoundObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [backgroundImage] = useImage('/assets/images/wheres_waldo.png');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSelectedObjects(getRandomObjects());
  }, []);

  useEffect(() => {
    if (foundObjects.length === selectedObjects.length && selectedObjects.length > 0) {
      setShowModal(true);
    }
  }, [foundObjects, selectedObjects]);


  const handleObjectClick = (id) => {
    if (!foundObjects.includes(id)) {
      setFoundObjects([...foundObjects, id]);
    }
  };

  const restartGame = () => {
    setFoundObjects([]);
    setSelectedObjects(getRandomObjects());
    setShowModal(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: 20, backgroundColor: 'black' }}>
      <h1 style={{ color: 'white', marginTop: 50 }}>Ache os Personagens</h1>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {selectedObjects.map((obj) => (
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
          Personagens encontrados: {foundObjects.length} / {selectedObjects.length}
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
            {selectedObjects.map((obj) => (
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
        {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: 'white',
        }}>
          <h2>Parabéns! Você encontrou todos os personagens!</h2>
          <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>Jogar Novamente</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
