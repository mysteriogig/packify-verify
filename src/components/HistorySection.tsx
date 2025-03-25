
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
      <div className="card-header py-2">
        <h2 className="card-title text-base">Packaging History</h2>
        <p className="card-description text-xs">Recently consolidated packages</p>
      </div>
      <div className="card-content py-1">
        <div className="space-y-1 max-h-[100px] overflow-y-auto">
          {history.map((consolidatedPkg) => (
            <div key={consolidatedPkg.id} className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-1 bg-muted/50 cursor-pointer"
                onClick={() => toggleExpand(consolidatedPkg.id)}
              >
                <div className="flex items-center gap-1">
                  <QrCode size={12} className="text-primary" />
                  <span className="font-medium text-xs">Package #{consolidatedPkg.id.substring(0, 6)}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-1 py-0.5 rounded-full">
                    {consolidatedPkg.packages.length} items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={10} />
                    <span>{new Date(consolidatedPkg.timestamp).toLocaleString()}</span>
                  </div>
                  {expandedPackageId === consolidatedPkg.id ? (
                    <ChevronUp size={12} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={12} className="text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {expandedPackageId === consolidatedPkg.id && (
                <div className="p-2 border-t bg-background animate-slide-in">
                  <div className="grid grid-cols-3 gap-1 mb-1">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Packed by:</span>{' '}
                      <span className="font-medium">{consolidatedPkg.packedBy}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Checked by:</span>{' '}
                      <span className="font-medium">{consolidatedPkg.checkedBy}</span>
                    </div>
                    <div className="text-xs flex items-center gap-1">
                      <QrCode size={10} className="text-muted-foreground" />
                      <span className="font-mono text-xs">
                        {consolidatedPkg.barcode.substring(0, 8)}...
                      </span>
                    </div>
                  </div>
                  
                  {consolidatedPkg.remarks && (
                    <div className="bg-muted/50 p-1 rounded-md text-xs mb-1">
                      <span className="text-muted-foreground">Remarks:</span>{' '}
                      {consolidatedPkg.remarks}
                    </div>
                  )}
                  
                  <div className="text-xs font-medium mb-1">Included Packages:</div>
                  <div className="table-container max-h-[80px] overflow-y-auto">
                    <table className="table">
                      <thead className="table-header">
                        <tr className="table-row">
                          <th className="table-head py-1 text-xs">Item Code</th>
                          <th className="table-head py-1 text-xs">Description</th>
                          <th className="table-head py-1 text-xs text-center">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {consolidatedPkg.packages.map((pkg) => (
                          <tr key={pkg.id} className="table-row">
                            <td className="table-cell py-1 text-xs">{pkg.itemCode}</td>
                            <td className="table-cell py-1 text-xs">{pkg.description}</td>
                            <td className="table-cell py-1 text-xs text-center">{pkg.quantity}</td>
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
