
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
      <div className="card animate-fade-in mb-2">
        <div className="card-header py-2">
          <h2 className="card-title text-base">Scanned Packages</h2>
          <p className="card-description text-xs">No packages scanned yet</p>
        </div>
        <div className="card-content py-3 flex flex-col items-center justify-center text-muted-foreground">
          <QrCode size={24} className="mb-1 opacity-50" />
          <p className="text-xs">Scan packages to add them to the list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in mb-2">
      <div className="card-header py-2">
        <h2 className="card-title text-base">Scanned Packages</h2>
        <p className="card-description text-xs">{packages.length} packages scanned</p>
      </div>
      <div className="card-content py-1">
        <div className="table-container max-h-120 overflow-y-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head py-1 text-xs">Item Code</th>
                <th className="table-head py-1 text-xs">Description</th>
                <th className="table-head py-1 text-xs text-center">Qty</th>
                <th className="table-head py-1 text-xs">Barcode</th>
                <th className="table-head py-1" style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="table-row animate-fade-in">
                  <td className="table-cell py-1 text-xs font-medium">{pkg.itemCode}</td>
                  <td className="table-cell py-1 text-xs">{pkg.description}</td>
                  <td className="table-cell py-1 text-xs text-center">{pkg.quantity}</td>
                  <td className="table-cell py-1">
                    <div className="flex items-center gap-1">
                      <QrCode size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">
                        {pkg.barcode.substring(0, 8)}...
                      </span>
                    </div>
                  </td>
                  <td className="table-cell py-1">
                    <button
                      onClick={() => onRemovePackage(pkg.id)}
                      className="p-1 text-muted-foreground hover-text-destructive rounded"
                      aria-label="Remove package"
                    >
                      <Trash2 size={14} />
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
