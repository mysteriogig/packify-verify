
import React, { useState } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import ScannedPackages from '../components/ScannedPackages';
import ImageVerification from '../components/ImageVerification';
import ConsolidationSection from '../components/ConsolidationSection';
import HistorySection from '../components/HistorySection';
import { Package, ConsolidatedPackage, FormInputs } from '../types';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [history, setHistory] = useState<ConsolidatedPackage[]>([]);
  const { toast } = useToast();

  const handleScanComplete = (formData: FormInputs) => {
    const newPackage: Package = {
      id: crypto.randomUUID(),
      itemCode: formData.itemCode,
      description: formData.itemName,
      quantity: formData.actualQty,
      barcode: Array(30).fill(0).map(() => Math.floor(Math.random() * 10)).join(''),
      timestamp: new Date().toISOString(),
    };

    setPackages([...packages, newPackage]);
    
    toast({
      title: "Package added",
      description: `${formData.itemCode} has been added to the list.`,
    });
  };

  const handleRemovePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    
    toast({
      title: "Package removed",
      description: "The package has been removed from the list.",
    });
  };

  const handleConsolidate = (packedBy: string, checkedBy: string, remarks: string) => {
    if (packages.length === 0) return;

    const consolidatedPackage: ConsolidatedPackage = {
      id: crypto.randomUUID(),
      packages: [...packages],
      barcode: Array(20).fill(0).map(() => Math.floor(Math.random() * 10)).join(''),
      timestamp: new Date().toISOString(),
      packedBy,
      checkedBy,
      remarks,
    };

    setHistory([consolidatedPackage, ...history]);
    setPackages([]);
    
    toast({
      title: "Consolidation complete",
      description: `${consolidatedPackage.packages.length} packages have been consolidated into one.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 py-8 max-w-5xl">
        <Header />
        
        <div className="grid grid-cols-1 gap-6">
          <InputForm onScanComplete={handleScanComplete} />
          
          <ScannedPackages 
            packages={packages} 
            onRemovePackage={handleRemovePackage}
          />
          
          <ImageVerification />
          
          <ConsolidationSection 
            packages={packages}
            onConsolidate={handleConsolidate}
          />
          
          <HistorySection history={history} />
        </div>
      </div>
    </div>
  );
};

export default Index;
