import Discounts from './discounts';
import Featured from './featured';

export function Store() {
  return (
    <div className="grid grid-rows-2 col-span-5">
      <Featured /> <Discounts />
    </div>
  );
}
