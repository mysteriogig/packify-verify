
import React, { useState } from 'react';
import { Upload, Image, Check, X } from 'lucide-react';

const ImageVerification: React.FC = () => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [actualImage, setActualImage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const handleReferenceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleActualImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setActualImage(reader.result as string);
        // In a real app, you'd compare the images or prompt the user to verify
        // For this demo, we'll simulate verification by setting a random value
        setIsVerified(Math.random() > 0.3);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card animate-slide-in mb-6">
      <div className="card-header">
        <h2 className="card-title">Image Verification</h2>
        <p className="card-description">Upload reference and actual images for comparison</p>
      </div>
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <div className="input-label">Reference Image</div>
            <div className="aspect-video bg-muted rounded-md overflow-hidden relative flex items-center justify-center">
              {referenceImage ? (
                <img 
                  src={referenceImage} 
                  alt="Reference" 
                  className="object-contain max-h-full max-w-full" 
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground p-4">
                  <Image size={32} className="mb-2 opacity-50" />
                  <p className="text-sm text-center">Upload a reference image</p>
                </div>
              )}
            </div>
            <label className="btn btn-outline flex items-center justify-center cursor-pointer">
              <Upload size={16} />
              <span>Upload Reference</span>
              <input 
                type="file" 
                accept="image/*" 
                className="sr-only" 
                onChange={handleReferenceImageUpload} 
              />
            </label>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="input-label">Actual Image</div>
            <div className="aspect-video bg-muted rounded-md overflow-hidden relative flex items-center justify-center">
              {actualImage ? (
                <img 
                  src={actualImage} 
                  alt="Actual" 
                  className="object-contain max-h-full max-w-full" 
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground p-4">
                  <Image size={32} className="mb-2 opacity-50" />
                  <p className="text-sm text-center">Upload an actual image</p>
                </div>
              )}
            </div>
            <label className="btn btn-outline flex items-center justify-center cursor-pointer">
              <Upload size={16} />
              <span>Upload Actual</span>
              <input 
                type="file" 
                accept="image/*" 
                className="sr-only" 
                onChange={handleActualImageUpload} 
              />
            </label>
          </div>
        </div>
        
        {isVerified !== null && (
          <div className={`mt-5 p-3 rounded-md flex items-center gap-2 ${
            isVerified 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {isVerified ? (
              <>
                <Check size={18} className="text-green-600" />
                <span>Images match. Verification passed.</span>
              </>
            ) : (
              <>
                <X size={18} className="text-red-600" />
                <span>Images don't match. Please verify again.</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageVerification;
