import { useState } from 'react';
import 'twin.macro';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div tw="text-center">
      <header tw="min-h-screen flex flex-col items-center justify-center gap-2 bg-[#282c34] text-2xl text-white">
        <p>Hello Vite + React!</p>
        <p>
          <button
            tw="bg-white/20 hover:bg-white/25 transition-colors rounded px-2 py-1"
            onClick={() => setCount(count + 1)}
            type="button"
          >
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  );
};

export default App;
