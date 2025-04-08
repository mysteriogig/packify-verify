
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, QrCode, X } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Mock function for barcode scanning
  // In a real app, this would use the camera API and a barcode scanning library
  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // Generate a random 30-character barcode
      const mockBarcode = Array(30)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join('');
      
      setIsScanning(false);
      onScan(mockBarcode);
      setIsOpen(false);
    }, 2000);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          type="button" 
          className="btn btn-outline flex-1 sm-flex-none" 
          onClick={() => setIsOpen(true)}
        >
          <QrCode size={16} />
          <span>Scan Barcode</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm-max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Package Barcode</DialogTitle>
        </DialogHeader>
        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
          {isScanning ? (
            <div className="flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
              <div className="relative">
                <Camera size={48} className="text-primary opacity-40 animate-pulse" />
                <div className="absolute inset-0 border-t-2 border-primary animate-spin rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4" style={{ width: '100%', height: '100%' }}>
              <QrCode size={48} className="text-muted-foreground mb-4" />
              <p className="text-center text-sm text-muted-foreground">
                Position the barcode in the camera view to scan automatically
              </p>
              <button 
                className="btn btn-primary mt-4" 
                onClick={startScanning}
              >
                Start Scanning
              </button>
            </div>
          )}
          
          {isScanning && (
            <button 
              className="absolute top-2 right-2 p-1 rounded-full bg-muted hover-bg-muted text-foreground"
              onClick={stopScanning}
            >
              <X size={16} />
            </button>
          )}
          
          <div className={`absolute inset-0 border-2 border-primary rounded-md transition-opacity duration-500 ${isScanning ? '' : 'opacity-0'}`}></div>
        </div>
        <div className="text-xs text-muted-foreground">
          Note: In a production environment, this would access your device's camera and scan real barcodes.
        </div>
      </DialogContent>
    </Dialog>
  );
};
