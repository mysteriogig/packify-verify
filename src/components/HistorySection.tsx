
import React, { useState } from 'react';
import { ConsolidatedPackage } from '../types';
import { ChevronDown, ChevronUp, QrCode, Package, Clock } from 'lucide-react';

interface HistorySectionProps {
  history: ConsolidatedPackage[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">Packaging History</h2>
        <p className="card-description">Recently consolidated packages</p>
      </div>
      <div className="card-content">
        <div className="space-y-3">
          {history.map((consolidatedPkg) => (
            <div key={consolidatedPkg.id} className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-muted/50 cursor-pointer"
                onClick={() => toggleExpand(consolidatedPkg.id)}
              >
                <div className="flex items-center gap-2">
                  <QrCode size={16} className="text-primary" />
                  <span className="font-medium">Package #{consolidatedPkg.id.substring(0, 8)}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {consolidatedPkg.packages.length} items
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    <span>{new Date(consolidatedPkg.timestamp).toLocaleString()}</span>
                  </div>
                  {expandedPackageId === consolidatedPkg.id ? (
                    <ChevronUp size={16} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {expandedPackageId === consolidatedPkg.id && (
                <div className="p-3 border-t bg-background animate-slide-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Packed by:</span>{' '}
                      <span className="font-medium">{consolidatedPkg.packedBy}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Checked by:</span>{' '}
                      <span className="font-medium">{consolidatedPkg.checkedBy}</span>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                      <QrCode size={14} className="text-muted-foreground" />
                      <span className="font-mono text-xs">
                        {consolidatedPkg.barcode.substring(0, 12)}...
                      </span>
                    </div>
                  </div>
                  
                  {consolidatedPkg.remarks && (
                    <div className="bg-muted/50 p-2 rounded-md text-sm mb-3">
                      <span className="text-muted-foreground">Remarks:</span>{' '}
                      {consolidatedPkg.remarks}
                    </div>
                  )}
                  
                  <div className="text-sm font-medium mb-2">Included Packages:</div>
                  <div className="table-container">
                    <table className="table">
                      <thead className="table-header">
                        <tr className="table-row">
                          <th className="table-head">Item Code</th>
                          <th className="table-head">Description</th>
                          <th className="table-head text-center">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {consolidatedPkg.packages.map((pkg) => (
                          <tr key={pkg.id} className="table-row">
                            <td className="table-cell py-2">{pkg.itemCode}</td>
                            <td className="table-cell py-2">{pkg.description}</td>
                            <td className="table-cell py-2 text-center">{pkg.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
