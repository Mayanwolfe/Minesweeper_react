const DifficultySettings = ({
    mines,
    setMines,
    height,
    setHeight,
    width,
    setWidth,
  }) => {
    return (
      <div className='difficulty'>
        <div>
          <label htmlFor='mines'>Mines</label>
          <input
            name='mines'
            type='number'
            value={mines}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              if (value < 1) return;
              setMines(value);
            }}
          />
        </div>
        <div>
          <label htmlFor='height'>Height</label>
          <input
            name='height'
            type='number'
            value={height}
            onChange={(e) => {
              let value = e.target.valueAsNumber;
              if (value < 1) return;
              setHeight(value);
            }}
          />
        </div>
        <div>
          <label htmlFor='width'>Width</label>
          <input
            name='width'
            type='number'
            value={width}
            onChange={(e) => {
              let value = e.target.valueAsNumber;
              if (value < 1) return;
              setWidth(value);
            }}
          />
        </div>
      </div>
    );
  };
  
  export default DifficultySettings;
  