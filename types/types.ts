/**
 * All shared interfaces live here
 */

export interface EventType {
  source: string;
  name: string;
  location: string;
  date: Date;
  time: string;
  availability: number;
  id: number;
}

export interface RatioProp {
  ratio: number;
}
