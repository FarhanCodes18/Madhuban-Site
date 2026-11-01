import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function GstInvoiceModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNum = `INV-MB-${order.id.replace('MB-', '')}`;
  const subtotal = order.subtotal || 1500;
  const cgst = Math.round(subtotal * 0.025);
  const sgst = Math.round(subtotal * 0.025);
  const discount = order.discount || 0;
  const grandTotal = Math.max(0, subtotal + cgst + sgst - discount);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-pastel shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:border-none print:shadow-none"
        >
          {/* Header Controls (Hidden on Print) */}
          <div className="flex items-center justify-between border-b border-pastel pb-3 print:hidden">
            <span className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-dark" />
              Tax Compliant GST Electronic Invoice
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-pastel text-brandText transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div className="space-y-5 text-brandText font-poppins">
            {/* Restaurant Letterhead */}
            <div className="text-center pb-4 border-b border-dashed border-pastel space-y-1">
              <h2 className="font-playfair text-2xl font-bold tracking-[0.2em] text-forest uppercase">
                MADHUBAN
              </h2>
              <p className="text-[10px] text-brandText-muted uppercase tracking-[0.25em]">
                Where Nature Meets Taste • Luxury Botanical Dining
              </p>
              <p className="text-[11px] text-brandText-muted">
                Madhuban Estate, Nature Valley, Pune 411045, Maharashtra
              </p>
              <div className="flex items-center justify-center gap-4 text-[10px] font-mono font-semibold pt-1 text-forest">
                <span>GSTIN: 27AAACM9921E1Z4</span>
                <span>•</span>
                <span>FSSAI: 11521034000188</span>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 text-xs py-1 gap-2 border-b border-pastel pb-3">
              <div>
                <p><strong className="text-brandText-muted">Invoice No:</strong> {invoiceNum}</p>
                <p><strong className="text-brandText-muted">Table / Type:</strong> {order.tableName} ({order.orderType})</p>
                <p><strong className="text-brandText-muted">Captain:</strong> Vikram R. (Station 01)</p>
              </div>
              <div className="text-right">
                <p><strong className="text-brandText-muted">Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong className="text-brandText-muted">Time:</strong> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong className="text-brandText-muted">Guest:</strong> {order.customerName}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-pastel text-brandText-muted uppercase text-[10px]">
                  <tr>
                    <th className="py-2">Item Description</th>
                    <th className="py-2">SAC</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pastel/40">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-semibold text-brandText">{item.name}</td>
                      <td className="py-2 font-mono text-[10px] text-brandText-muted">996331</td>
                      <td className="py-2 text-center font-bold">{item.quantity}</td>
                      <td className="py-2 text-right font-dmsans">₹{item.price}</td>
                      <td className="py-2 text-right font-bold font-dmsans">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-dashed border-pastel space-y-1.5 text-xs">
              <div className="flex justify-between text-brandText-muted">
                <span>Subtotal</span>
                <span className="font-dmsans font-semibold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-forest font-semibold">
                  <span>Promotional Savings ({order.couponCode || 'Voucher'})</span>
                  <span className="font-dmsans">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-brandText-muted">
                <span>CGST (2.5%)</span>
                <span className="font-dmsans">₹{cgst}</span>
              </div>
              <div className="flex justify-between text-brandText-muted">
                <span>SGST (2.5%)</span>
                <span className="font-dmsans">₹{sgst}</span>
              </div>
              <div className="pt-2 border-t border-brandText flex justify-between text-sm font-bold text-forest">
                <span>Grand Total (INR)</span>
                <span className="font-dmsans text-lg">₹{grandTotal}</span>
              </div>
            </div>

            {/* Footer QR Seal & Signoff */}
            <div className="pt-4 border-t border-dashed border-pastel flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QRCodeSVG
                  value={`https://madhuban.com/invoice/${invoiceNum}`}
                  size={60}
                />
                <div className="text-[10px] text-brandText-muted leading-tight">
                  <p className="font-bold text-forest">Digitally Authenticated</p>
                  <p>Scan for online e-Invoice copy</p>
                </div>
              </div>

              <div className="text-right text-[10px] text-brandText-muted italic">
                <p>Thank you for dining with Madhuban.</p>
                <p>Service charge optional as per patron's discretion.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
