
import React, { useState } from 'react';
import { FormInputs } from '../types';
import { BarcodeScanner } from './BarcodeScanner';

interface InputFormProps {
  onScanComplete: (data: FormInputs) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onScanComplete }) => {
  const [formData, setFormData] = useState<FormInputs>({
    fgCode: '',
    itemCode: '',
    tagNo: '',
    itemName: '',
    npm: '',
    actualQty: 0
  });

  // In a real app, this would fetch data from your backend
  const mockFetchDataFromBarcode = (barcode: string) => {
    // Simulate API call with timeout
    return new Promise<FormInputs>((resolve) => {
      setTimeout(() => {
        // Mock data based on barcode
        resolve({
          fgCode: `FG-${barcode.substring(0, 5)}`,
          itemCode: `IC-${barcode.substring(5, 10)}`,
          tagNo: `T-${barcode.substring(10, 15)}`,
          itemName: `Item ${barcode.substring(15, 20)}`,
          npm: `NPM-${barcode.substring(20, 25)}`,
          actualQty: Math.floor(Math.random() * 100)
        });
      }, 800);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'actualQty' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScanComplete(formData);
    // Reset form after submission
    setFormData({
      fgCode: '',
      itemCode: '',
      tagNo: '',
      itemName: '',
      npm: '',
      actualQty: 0
    });
  };

  const handleBarcodeScanned = async (barcode: string) => {
    try {
      const data = await mockFetchDataFromBarcode(barcode);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching data from barcode:', error);
    }
  };

  return (
    <div className="card animate-slide-in mb-6">
      <div className="card-header">
        <h2 className="card-title">Package Information</h2>
        <p className="card-description">Enter details manually or scan barcode</p>
      </div>
      <form onSubmit={handleSubmit} className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-field">
            <label htmlFor="fgCode" className="input-label">FG Code</label>
            <input
              type="text"
              id="fgCode"
              name="fgCode"
              value={formData.fgCode}
              onChange={handleChange}
              className="input-control"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="itemCode" className="input-label">Item Code</label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              className="input-control"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="tagNo" className="input-label">Tag No</label>
            <input
              type="text"
              id="tagNo"
              name="tagNo"
              value={formData.tagNo}
              onChange={handleChange}
              className="input-control"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="itemName" className="input-label">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="input-control"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="npm" className="input-label">NPM</label>
            <input
              type="text"
              id="npm"
              name="npm"
              value={formData.npm}
              onChange={handleChange}
              className="input-control"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="actualQty" className="input-label">Actual Qty</label>
            <input
              type="number"
              id="actualQty"
              name="actualQty"
              value={formData.actualQty || ''}
              onChange={handleChange}
              className="input-control"
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <BarcodeScanner onScan={handleBarcodeScanned} />
          <button type="submit" className="btn btn-primary">
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
