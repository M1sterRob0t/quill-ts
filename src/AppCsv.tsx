import { useState } from 'react';
import * as d3 from 'd3';
import './App.css';

type CSVRow = {
  id: string;
  agentId: string;
  agentName: string;
  connectionType: string;
  terminalType: string;
};

type Filter = {
  ids?: number[];
  agentIds?: number[];
  agentName?: string;
  connectionType?: (1 | 2 | 3)[];
  terminalType?: (1 | 2 | 3 | 4 | 5 | 6 | 7)[];
};

const defaultFilter = {
  agentIds: undefined,
  agentName: undefined,
  connectionType: undefined,
  ids: undefined,
  terminalType: undefined,
};

const AppCsv = () => {
  const [data, setData] = useState<string | null>(null);

  function onChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.preventDefault();
    const input = evt.currentTarget as HTMLInputElement;

    if (input && input.files) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function () {
        const csvRows: CSVRow[] = d3.csvParse(reader.result as string);
        const filter = csvRows.reduce(
          (acc: Filter, cur: CSVRow) =>
            ({
              agentIds: cur.agentId ? (acc.agentIds ? [...acc.agentIds, +cur.agentId] : [+cur.agentId]) : acc.agentIds,
              ids: cur.id ? (acc.ids ? [...acc.ids, +cur.id] : [+cur.id]) : acc.ids,
              agentName: cur.agentName ? cur.agentName : acc.agentName,
              connectionType: cur.connectionType
                ? acc.connectionType
                  ? [...acc.connectionType, +cur.connectionType]
                  : [+cur.connectionType]
                : acc.connectionType,
              terminalType: cur.terminalType
                ? acc.terminalType
                  ? [...acc.terminalType, +cur.terminalType]
                  : [+cur.terminalType]
                : acc.terminalType,
            } as Filter),
          defaultFilter
        );

        console.log(filter);
        setData(JSON.stringify(filter));
      };

      reader.onerror = function () {
        console.log(reader.error);
      };

      reader.readAsText(file);
    }
  }

  return (
    <div>
      <form>
        <input type="file" name="file" onChange={onChange} accept="csv" />
        <button type="reset" onClick={() => setData(null)}>
          Очистить
        </button>
      </form>
      <div className="container">{data}</div>
    </div>
  );
};

export default AppCsv;
