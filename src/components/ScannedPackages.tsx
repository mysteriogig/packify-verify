
import React from 'react';
import { Package } from '../types';
import { QrCode, Trash2 } from 'lucide-react';

interface ScannedPackagesProps {
  packages: Package[];
  onRemovePackage: (id: string) => void;
}

const ScannedPackages: React.FC<ScannedPackagesProps> = ({ packages, onRemovePackage }) => {
  if (packages.length === 0) {
    return (
      <div className="card animate-fade-in mb-6">
        <div className="card-header">
          <h2 className="card-title">Scanned Packages</h2>
          <p className="card-description">No packages scanned yet</p>
        </div>
        <div className="card-content py-10 flex flex-col items-center justify-center text-muted-foreground">
          <QrCode size={32} className="mb-2 opacity-50" />
          <p className="text-sm">Scan packages to add them to the list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in mb-6">
      <div className="card-header">
        <h2 className="card-title">Scanned Packages</h2>
        <p className="card-description">{packages.length} packages scanned</p>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Item Code</th>
                <th className="table-head">Description</th>
                <th className="table-head text-center">Quantity</th>
                <th className="table-head">Barcode</th>
                <th className="table-head w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="table-row animate-fade-in">
                  <td className="table-cell font-medium">{pkg.itemCode}</td>
                  <td className="table-cell">{pkg.description}</td>
                  <td className="table-cell text-center">{pkg.quantity}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <QrCode size={16} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">
                        {pkg.barcode.substring(0, 8)}...
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => onRemovePackage(pkg.id)}
                      className="p-1 text-muted-foreground hover:text-destructive rounded"
                      aria-label="Remove package"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScannedPackages;
