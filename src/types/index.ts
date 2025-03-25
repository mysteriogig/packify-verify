
export interface Package {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  barcode: string;
  timestamp: string;
}

export interface ConsolidatedPackage {
  id: string;
  packages: Package[];
  barcode: string;
  timestamp: string;
  packedBy: string;
  checkedBy: string;
  remarks: string;
}

export interface FormInputs {
  fgCode: string;
  itemCode: string;
  tagNo: string;
  itemName: string;
  npm: string;
  actualQty: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'worker' | 'supervisor';
}
