import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Users,
  Printer,
  ExternalLink,
  X,
  ArrowRightLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { Link } from 'react-router-dom';

export default function TableManagement() {
  const { tables, setTables, orders, transferTableOrder, showToast } = useDemoRestaurant();
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [transferModal, setTransferModal] = useState(null); // { fromTableId: string, toTableId: string }

  const handleStatusChange = (tableId, newStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t))
    );
    showToast(`Table ${tableId} status updated to ${newStatus.toUpperCase()}`, 'info');
  };

  const getTableUrl = (tableId) => {
    const origin = window.location.origin;
    return `${origin}/table/${tableId}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExecuteTransfer = () => {
    if (!transferModal?.fromTableId || !transferModal?.toTableId) {
      showToast('Please select both source and destination tables.', 'warning');
      return;
    }
    if (transferModal.fromTableId === transferModal.toTableId) {
      showToast('Source and destination tables must be different.', 'warning');
      return;
    }

    const success = transferTableOrder(transferModal.fromTableId, transferModal.toTableId);
    if (success) {
      setTransferModal(null);
    }
  };

  const occupiedTablesWithOrders = tables.filter(
    (t) => t.status === 'occupied' || t.activeOrderId || orders.some((o) => o.tableId === t.id && o.status !== 'served' && o.status !== 'cancelled')
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Table Architecture & Floor Operations
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Generate printable high-resolution QR plaques and manage live table transfers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setTransferModal({
                fromTableId: occupiedTablesWithOrders[0]?.id || '01',
                toTableId: tables.find((t) => t.status === 'available')?.id || '02',
              })
            }
            className="px-4 py-2 rounded-2xl bg-forest hover:bg-forest-dark text-cream text-xs font-bold flex items-center gap-2 shadow-soft transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-gold" />
            <span>Transfer Table Order</span>
          </button>

          <div className="text-xs font-semibold text-forest bg-white px-4 py-2 rounded-2xl border border-pastel shadow-soft-sm">
            Floor Capacity: <span className="font-bold">{tables.reduce((acc, t) => acc + t.capacity, 0)} Seats</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => {
          const tableUrl = getTableUrl(table.id);
          const activeOrder = orders.find(
            (o) => o.tableId === table.id && o.status !== 'served' && o.status !== 'cancelled'
          );

          return (
            <div
              key={table.id}
              className={`p-5 rounded-3xl bg-white border shadow-soft-sm flex flex-col justify-between space-y-4 hover:shadow-soft transition ${
                table.status === 'occupied'
                  ? 'border-amber-300/80 bg-amber-50/10'
                  : 'border-pastel'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-forest text-cream font-playfair font-bold text-base flex items-center justify-center">
                      {table.id}
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-brandText text-base">
                        {table.name}
                      </h3>
                      <p className="text-[10px] text-brandText-muted">{table.section}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      table.status === 'occupied'
                        ? 'bg-red-100 text-red-800'
                        : table.status === 'reserved'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="text-xs text-brandText-muted flex items-center justify-between py-2 border-y border-pastel/40">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-forest" />
                    {table.capacity} Seater
                  </span>
                  {activeOrder ? (
                    <span className="text-forest font-bold font-mono text-[11px] bg-pastel/50 px-2 py-0.5 rounded-md">
                      Active: #{activeOrder.id}
                    </span>
                  ) : (
                    <span className="text-[11px] text-brandText-muted">Vacant</span>
                  )}
                </div>
              </div>

              {/* Status Controls, QR and Transfer */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => handleStatusChange(table.id, 'available')}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      table.status === 'available'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-bgLight text-brandText hover:bg-pastel'
                    }`}
                  >
                    Free
                  </button>
                  <button
                    onClick={() => handleStatusChange(table.id, 'occupied')}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      table.status === 'occupied'
                        ? 'bg-red-600 text-white'
                        : 'bg-bgLight text-brandText hover:bg-pastel'
                    }`}
                  >
                    Occupied
                  </button>
                  <button
                    onClick={() => handleStatusChange(table.id, 'reserved')}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      table.status === 'reserved'
                        ? 'bg-amber-600 text-white'
                        : 'bg-bgLight text-brandText hover:bg-pastel'
                    }`}
                  >
                    Reserved
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveQrModal(table)}
                    className="py-2 px-3 rounded-xl bg-forest text-cream font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-forest-dark transition"
                  >
                    <QrCode className="w-3.5 h-3.5 text-gold" />
                    <span>View QR</span>
                  </button>

                  {activeOrder ? (
                    <button
                      onClick={() =>
                        setTransferModal({
                          fromTableId: table.id,
                          toTableId: tables.find((t) => t.status === 'available' && t.id !== table.id)?.id || '02',
                        })
                      }
                      className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <ArrowRightLeft className="w-3 h-3" />
                      <span>Transfer</span>
                    </button>
                  ) : (
                    <Link
                      to={`/table/${table.id}`}
                      target="_blank"
                      className="py-2 px-3 rounded-xl bg-pastel/70 text-forest font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-pastel transition"
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Code Plaque Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-md">
          <div className="w-full max-w-sm bg-cream rounded-3xl p-8 border-4 border-gold/40 shadow-2xl text-center space-y-5 relative">
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-pastel text-brandText"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand Header */}
            <div>
              <span className="font-playfair text-xl font-bold tracking-[0.2em] text-forest uppercase block">
                Madhuban
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">
                Where Nature Meets Taste
              </span>
            </div>

            {/* Table Number Pill */}
            <div className="inline-block px-5 py-1.5 rounded-full bg-forest text-cream font-playfair font-bold text-base shadow-soft">
              {activeQrModal.name}
            </div>

            {/* QR Code SVG */}
            <div className="p-4 bg-white rounded-2xl shadow-inner border border-pastel inline-block mx-auto">
              <QRCodeSVG
                value={getTableUrl(activeQrModal.id)}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#183B29"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-forest">
                Scan with Smartphone Camera to Order
              </p>
              <p className="text-[10px] text-brandText-muted mt-0.5">
                URL: {getTableUrl(activeQrModal.id)}
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-gold" />
                <span>Print Table Plaque</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Transfer Modal */}
      {transferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-pastel shadow-2xl space-y-5 relative">
            <button
              onClick={() => setTransferModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-pastel text-brandText"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg text-brandText">
                  Live Table Transfer
                </h3>
                <p className="text-xs text-brandText-muted">
                  Seamlessly move dining guests and their live active bill.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-forest uppercase tracking-wider mb-1.5">
                  Source Table (From)
                </label>
                <select
                  value={transferModal.fromTableId}
                  onChange={(e) =>
                    setTransferModal((prev) => ({ ...prev, fromTableId: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-pastel bg-bgLight text-xs font-semibold text-brandText focus:outline-none focus:border-forest"
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      Table {t.id} ({t.name}) - {t.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-forest uppercase tracking-wider mb-1.5">
                  Destination Table (To)
                </label>
                <select
                  value={transferModal.toTableId}
                  onChange={(e) =>
                    setTransferModal((prev) => ({ ...prev, toTableId: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-pastel bg-bgLight text-xs font-semibold text-brandText focus:outline-none focus:border-forest"
                >
                  {tables
                    .filter((t) => t.id !== transferModal.fromTableId)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        Table {t.id} ({t.name}) - {t.status}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Active order preview being transferred */}
            {(() => {
              const movingOrder = orders.find(
                (o) =>
                  o.tableId === transferModal.fromTableId &&
                  o.status !== 'served' &&
                  o.status !== 'cancelled'
              );

              return movingOrder ? (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-950">
                    <span>Order #{movingOrder.id}</span>
                    <span>₹{movingOrder.total}</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {movingOrder.items.length} dishes • Status: {movingOrder.status}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-brandText-muted flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>No active unpaid order found on Table {transferModal.fromTableId}.</span>
                </div>
              );
            })()}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTransferModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-pastel text-xs font-bold text-brandText hover:bg-pastel/40 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteTransfer}
                className="flex-1 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-cream text-xs font-bold shadow-soft transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4 text-gold" />
                <span>Execute Transfer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
