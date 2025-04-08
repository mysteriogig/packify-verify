
import React, { useState } from 'react';
import { Package, Employee } from '../types';
import { QrCode, Printer, PackageCheck, ScanBarcode } from 'lucide-react';
import { BarcodeScanner } from './BarcodeScanner';

interface ConsolidationSectionProps {
  packages: Package[];
  onConsolidate: (packedBy: string, checkedBy: string, remarks: string) => void;
}

const ConsolidationSection: React.FC<ConsolidationSectionProps> = ({ packages, onConsolidate }) => {
  const [packedBy, setPackedBy] = useState('');
  const [checkedBy, setCheckedBy] = useState('');
  const [remarks, setRemarks] = useState('');
  const [masterBarcode, setMasterBarcode] = useState('');
  const [consolidatedBarcode, setConsolidatedBarcode] = useState<string | null>(null);

  const employees: Employee[] = [
    { id: '1', name: 'John Smith', role: 'worker' },
    { id: '2', name: 'Jane Doe', role: 'worker' },
    { id: '3', name: 'Alex Johnson', role: 'supervisor' },
    { id: '4', name: 'Sarah Parker', role: 'supervisor' },
  ];

  const workers = employees.filter(emp => emp.role === 'worker');
  const supervisors = employees.filter(emp => emp.role === 'supervisor');

  const handleBarcodeScanned = (barcode: string) => {
    setMasterBarcode(barcode);
  };

  const handleMapBarcode = () => {
    if (!masterBarcode.trim()) {
      alert('Please enter a master barcode');
      return;
    }
    
    setConsolidatedBarcode(masterBarcode);
  };

  const handleConsolidate = () => {
    onConsolidate(packedBy, checkedBy, remarks);
    setPackedBy('');
    setCheckedBy('');
    setRemarks('');
    setMasterBarcode('');
    setConsolidatedBarcode(null);
  };

  const handlePrint = () => {
    alert('Printing functionality would be implemented here');
  };

  const isFormValid = packedBy && checkedBy;
  const canPrint = consolidatedBarcode !== null;

  return (
    <div className="card animate-slide-in mb-2">
      <div className="card-header py-2">
        <h2 className="card-title text-base">Package Consolidation</h2>
        <p className="card-description text-xs">Combine scanned packages and map to master barcode</p>
      </div>
      <div className="card-content py-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="input-field mb-1">
            <label htmlFor="packedBy" className="input-label text-xs">Packed By</label>
            <select
              id="packedBy"
              value={packedBy}
              onChange={(e) => setPackedBy(e.target.value)}
              className="input-control py-1 text-xs"
              required
            >
              <option value="">Select worker</option>
              {workers.map(worker => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-field mb-1">
            <label htmlFor="checkedBy" className="input-label text-xs">Checked By</label>
            <select
              id="checkedBy"
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
              className="input-control py-1 text-xs"
              required
            >
              <option value="">Select supervisor</option>
              {supervisors.map(supervisor => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="input-field mb-2">
          <label htmlFor="remarks" className="input-label text-xs">Remarks</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="input-control py-1 text-xs min-h-40"
            placeholder="Add any additional notes or observations..."
          />
        </div>
        
        <div className="input-field mb-2">
          <label htmlFor="masterBarcode" className="input-label text-xs">Master Barcode</label>
          <div className="flex gap-2">
            <input
              id="masterBarcode"
              type="text"
              value={masterBarcode}
              onChange={(e) => setMasterBarcode(e.target.value)}
              className="input-control py-1 text-xs flex-1"
              placeholder="Enter or scan master barcode..."
            />
            <BarcodeScanner onScan={handleBarcodeScanned} />
          </div>
        </div>
        
        {consolidatedBarcode && (
          <div className="bg-muted p-2 rounded-md mb-2 flex flex-col items-center">
            <div className="text-xs font-medium mb-1">Mapped Master Barcode</div>
            <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-md border">
              <QrCode size={16} className="text-primary" />
              <span className="font-mono text-xs">{consolidatedBarcode}</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mt-2">
          <button
            type="button"
            className="btn btn-primary py-1 text-xs h-8"
            onClick={handleMapBarcode}
            disabled={packages.length === 0 || !masterBarcode || !isFormValid}
          >
            <QrCode size={14} />
            <span>Map Barcode</span>
          </button>
          
          <button
            type="button"
            className="btn btn-outline py-1 text-xs h-8"
            onClick={handlePrint}
            disabled={!canPrint}
          >
            <Printer size={14} />
            <span>Print Label</span>
          </button>
          
          <button
            type="button"
            className="btn btn-secondary py-1 text-xs h-8"
            onClick={handleConsolidate}
            disabled={packages.length === 0 || !canPrint || !isFormValid}
          >
            <PackageCheck size={14} />
            <span>Complete Consolidation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsolidationSection;
