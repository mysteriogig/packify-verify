
import React, { useState } from 'react';
import { Package, Employee } from '../types';
import { QrCode, Printer, PackageCheck } from 'lucide-react';

interface ConsolidationSectionProps {
  packages: Package[];
  onConsolidate: (packedBy: string, checkedBy: string, remarks: string) => void;
}

const ConsolidationSection: React.FC<ConsolidationSectionProps> = ({ packages, onConsolidate }) => {
  const [packedBy, setPackedBy] = useState('');
  const [checkedBy, setCheckedBy] = useState('');
  const [remarks, setRemarks] = useState('');
  const [consolidatedBarcode, setConsolidatedBarcode] = useState<string | null>(null);

  // Mock employee data
  const employees: Employee[] = [
    { id: '1', name: 'John Smith', role: 'worker' },
    { id: '2', name: 'Jane Doe', role: 'worker' },
    { id: '3', name: 'Alex Johnson', role: 'supervisor' },
    { id: '4', name: 'Sarah Parker', role: 'supervisor' },
  ];

  const workers = employees.filter(emp => emp.role === 'worker');
  const supervisors = employees.filter(emp => emp.role === 'supervisor');

  const handleGenerateBarcode = () => {
    // Generate a random barcode for the consolidated package
    const mockBarcode = Array(20)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('');
    
    setConsolidatedBarcode(mockBarcode);
  };

  const handleConsolidate = () => {
    onConsolidate(packedBy, checkedBy, remarks);
    setPackedBy('');
    setCheckedBy('');
    setRemarks('');
    setConsolidatedBarcode(null);
  };

  const handlePrint = () => {
    // In a real app, this would trigger a print dialog or generate a PDF
    alert('Printing functionality would be implemented here');
  };

  const isFormValid = packedBy && checkedBy;
  const canPrint = consolidatedBarcode !== null;

  return (
    <div className="card animate-slide-in mb-6">
      <div className="card-header">
        <h2 className="card-title">Package Consolidation</h2>
        <p className="card-description">Combine scanned packages and generate a final barcode</p>
      </div>
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="input-field">
            <label htmlFor="packedBy" className="input-label">Packed By</label>
            <select
              id="packedBy"
              value={packedBy}
              onChange={(e) => setPackedBy(e.target.value)}
              className="input-control"
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
          <div className="input-field">
            <label htmlFor="checkedBy" className="input-label">Checked By</label>
            <select
              id="checkedBy"
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
              className="input-control"
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
        
        <div className="input-field mb-4">
          <label htmlFor="remarks" className="input-label">Remarks</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="input-control min-h-[80px]"
            placeholder="Add any additional notes or observations..."
          />
        </div>
        
        {consolidatedBarcode && (
          <div className="bg-muted p-4 rounded-md mb-4 flex flex-col items-center">
            <div className="text-sm font-medium mb-2">Consolidated Package Barcode</div>
            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-md border">
              <QrCode size={24} className="text-primary" />
              <span className="font-mono text-sm">{consolidatedBarcode}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This barcode represents {packages.length} combined packages
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            className="btn btn-primary flex-1 sm:flex-none"
            onClick={handleGenerateBarcode}
            disabled={packages.length === 0 || !isFormValid}
          >
            <QrCode size={16} />
            <span>Generate Barcode</span>
          </button>
          
          <button
            type="button"
            className="btn btn-outline flex-1 sm:flex-none"
            onClick={handlePrint}
            disabled={!canPrint}
          >
            <Printer size={16} />
            <span>Print Label</span>
          </button>
          
          <button
            type="button"
            className="btn btn-secondary flex-1 sm:flex-none"
            onClick={handleConsolidate}
            disabled={packages.length === 0 || !canPrint || !isFormValid}
          >
            <PackageCheck size={16} />
            <span>Complete Consolidation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsolidationSection;
