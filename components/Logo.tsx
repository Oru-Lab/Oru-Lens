
import React from 'react';

export const Logo: React.FC<{ className?: string, isPreloader?: boolean, hideText?: boolean }> = ({ className = "h-10", isPreloader = false, hideText = false }) => {
  const gearPath = "M88 44h-8.7c-.8-3.4-2.1-6.6-4.1-9.5l6.2-6.2-8.5-8.5-6.2 6.2c-2.9-2-6.1-3.3-9.5-4.1V12h-12v8.7c-3.4.8-6.6 2.1-9.5 4.1l-6.2-6.2-8.5 8.5 6.2 6.2c-2 2.9-3.3 6.1-4.1 9.5H12v12h8.7c.8 3.4 2.1 6.6 4.1 9.5l-6.2 6.2 8.5 8.5 6.2-6.2c2.9 2 6.1 3.3 9.5 4.1V88h12v-8.7c3.4-.8 6.6-2.1 9.5-4.1l6.2 6.2 8.5-8.5-6.2-6.2c2-2.9 3.3-6.1 4.1-9.5H88V44zM50 62c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z";

  return (
    <div className={`flex items-center gap-4 ${className} group cursor-pointer select-none`}>
      <div className={`relative ${isPreloader ? 'w-24 h-24' : 'w-10 h-10'} flex-shrink-0 transition-transform duration-500 group-hover:scale-110`}>
        {/* Glow */}
        <div className="absolute inset-0 bg-current opacity-10 blur-2xl rounded-full scale-150 group-hover:opacity-30 transition-opacity"></div>
        
        {/* Gear 1 */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-current animate-gear absolute top-0 left-0"
        >
          <path fill="currentColor" d={gearPath} />
        </svg>

        {/* Gear 2 */}
        <svg
          viewBox="0 0 100 100"
          className={`text-current opacity-40 animate-gear-reverse absolute ${isPreloader ? 'w-12 h-12 -top-4 -right-4' : 'w-5 h-5 -top-1 -right-1'}`}
        >
          <path fill="currentColor" d={gearPath} />
        </svg>
      </div>
      {!hideText && !isPreloader && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2">
            ORU <span className="opacity-40 font-light">LENS</span>
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="h-[1px] w-4 bg-current opacity-30"></div>
            <span className="text-[8px] tracking-[0.4em] opacity-40 uppercase font-bold whitespace-nowrap">Bedrock Engineering</span>
          </div>
        </div>
      )}
    </div>
  );
};
