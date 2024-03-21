import React from "react";

function Icons() {
  // Define the inline styles based on your CSS
  const styles = {
    wrap: {
      position: 'relative',
      padding: '20px',
      float: 'right',
      marginRight: '50px',
    },
    p: (color) => ({
      fontFamily: '"Arial", sans-serif',
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '30px',
      letterSpacing: '-2px',
      color,
    }),
    span: {
      fontSize: '30px',
      color: 'gray',
      fontFamily: 'HYGothic, sans-serif',
    },
    body: {
      background: '#333',
      margin: 0,
    },
    titleLetter: (color) => ({
      fontSize: '60px',
      fontWeight: 'bold',
      fontFamily: 'Brush Script MT',
      color: color,
      display: 'inline-block', // Keeps letters inline
    })
  };

  // Array of letters and their colors for the title
  const titleLetters = [
    { letter: 'B', color: '#00d0c7' },
    { letter: 'r', color: '#00d0c7' },
    { letter: 'a', color: '#00d0c7' },
    { letter: 'v', color: '#00d0c7' },
    { letter: 'e', color: '#00d0c7' },
    { letter: 'S', color: '#00d0c7' },
    { letter: 'p', color: '#00d0c7' },
    { letter: 'e', color: '#00d0c7' },
    { letter: 'a', color: '#00d0c7' },
    { letter: 'k', color: '#00d0c7' },
    { letter: 'A', color: '#00d0c7' },
    { letter: 'R', color: '#00d0c7' }
  ];

  // The component JSX
  return (
    <>
      <div className="content" style={{width:'925px'}}>
        {/* Title rendering */}
        {/*<div>*/}
        {/*  {titleLetters.map((item, index) => (*/}
        {/*    <span key={index} style={styles.titleLetter(item.color)}>{item.letter}</span>*/}
        {/*  ))}*/}
        {/*</div>*/}
        {/* Existing text and wrap */}
        <div className="wrap" style={styles.wrap}>
            <p style={styles.p('#00d0c7')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>B</span> BE <span style={styles.span}>HAPPY</span></p>
            <p style={styles.p('#00d0c7')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>R</span> RELAX <span style={styles.span}>OFTEN</span></p>
            <p style={styles.p('#00e0b7')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>A</span> ASPIRE <span style={styles.span}>ACHIEVEMENTS</span></p>
            <p style={styles.p('#00e0b7')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>V</span> VISUALIZE <span style={styles.span}>VICTORY</span></p>
            <p style={styles.p('#00e097')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>E</span> ELEVATE <span style={styles.span}>ENTHUSIASM</span></p>
            <p style={styles.p('#00e087')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>S</span> STAY <span style={styles.span}>STRONG</span></p>
            <p style={styles.p('#999900')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>P</span> PROMOTE <span style={styles.span}>POSITIVITY</span></p>
            <p style={styles.p('#aaaa00')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>E</span> EXCEED <span style={styles.span}>EXPECTATIONS</span></p>
            <p style={styles.p('#bb9900')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>A</span> ACT <span style={styles.span}>ACCORDINGLY</span></p>
            <p style={styles.p('#bb8800')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>K</span> KEEP <span style={styles.span}>KEEN</span></p>
            <p style={styles.p('#dd8800')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>A</span> AVOID <span style={styles.span}>ANXIETY</span></p>
            <p style={styles.p('#dd6600')}><span style={{fontFamily:'Brush Script MT', color:'darkslategray'}}>R</span> REACT <span style={styles.span}>CALMLY</span></p>

        </div>
      </div>
    </>
  );
}

export default Icons;
