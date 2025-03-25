
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
    <div className="card animate-slide-in mb-2">
      <div className="card-header py-2">
        <h2 className="card-title text-base">Package Information</h2>
        <p className="card-description text-xs">Enter details manually or scan barcode</p>
      </div>
      <form onSubmit={handleSubmit} className="card-content py-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="input-field mb-1">
            <label htmlFor="fgCode" className="input-label text-xs">FG Code</label>
            <input
              type="text"
              id="fgCode"
              name="fgCode"
              value={formData.fgCode}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              required
            />
          </div>
          <div className="input-field mb-1">
            <label htmlFor="itemCode" className="input-label text-xs">Item Code</label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              required
            />
          </div>
          <div className="input-field mb-1">
            <label htmlFor="tagNo" className="input-label text-xs">Tag No</label>
            <input
              type="text"
              id="tagNo"
              name="tagNo"
              value={formData.tagNo}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              required
            />
          </div>
          <div className="input-field mb-1">
            <label htmlFor="itemName" className="input-label text-xs">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              required
            />
          </div>
          <div className="input-field mb-1">
            <label htmlFor="npm" className="input-label text-xs">NPM</label>
            <input
              type="text"
              id="npm"
              name="npm"
              value={formData.npm}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              required
            />
          </div>
          <div className="input-field mb-1">
            <label htmlFor="actualQty" className="input-label text-xs">Actual Qty</label>
            <input
              type="number"
              id="actualQty"
              name="actualQty"
              value={formData.actualQty || ''}
              onChange={handleChange}
              className="input-control py-1 text-xs"
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="flex flex-row gap-2 mt-2">
          <BarcodeScanner onScan={handleBarcodeScanned} />
          <button type="submit" className="btn btn-primary py-1 text-xs h-8">
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
