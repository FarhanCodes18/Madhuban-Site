import React, { useState } from 'react';
import {
  CheckCircle2,
  UserCheck,
  XCircle
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function WaiterRequests() {
  const { waiterRequests, updateWaiterRequestStatus, cancelWaiterRequest } = useDemoRestaurant();
  const [filter, setFilter] = useState('all');

  const filteredRequests = waiterRequests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const staffMembers = ['Captain Vikram', 'Suresh Kumar', 'Aarti Nair', 'Floor Host Rohan'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Floor Waiter Service Calls
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Real-time table assistance calls, water requests, cutlery, and bill settlement calls.
          </p>
        </div>

        <div className="text-xs font-semibold text-forest bg-white px-4 py-2 rounded-2xl border border-pastel shadow-soft-sm">
          Active Calls: <span className="font-bold">{waiterRequests.filter(r => r.status === 'pending').length}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-pastel w-fit text-xs">
        {['all', 'pending', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider transition ${
              filter === status
                ? 'bg-forest text-cream shadow-soft'
                : 'text-brandText hover:bg-pastel/40'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-pastel">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <p className="font-playfair font-bold text-base text-brandText">No service requests</p>
            <p className="text-xs text-brandText-muted">Floor captains have attended to all table calls.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`p-5 sm:p-6 rounded-3xl border shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition ${
                req.status === 'pending'
                  ? 'bg-amber-50/40 border-amber-300'
                  : req.status === 'in_progress'
                  ? 'bg-blue-50/40 border-blue-300'
                  : 'bg-white border-pastel'
              }`}
            >
              {/* Left Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-forest text-gold flex items-center justify-center font-bold text-sm font-playfair shrink-0">
                    {req.tableId}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-playfair font-bold text-base text-brandText">
                        {req.requestType}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-200 text-amber-900 animate-pulse'
                      }`}>
                        {req.status === 'in_progress' ? 'Staff Dispatched' : req.status}
                      </span>
                    </div>
                    <p className="text-xs text-forest font-semibold">
                      {req.tableName} • Received {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {req.message && (
                  <p className="text-xs text-brandText-muted bg-white p-2.5 rounded-xl border border-pastel/60 ml-13">
                    <strong>Guest Note:</strong> "{req.message}"
                  </p>
                )}

                {req.assignedTo && (
                  <p className="text-[11px] text-blue-900 font-medium flex items-center gap-1.5 ml-13">
                    <UserCheck className="w-3.5 h-3.5 text-blue-700" />
                    Assigned Staff: <strong className="text-brandText">{req.assignedTo}</strong>
                  </p>
                )}
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {req.status === 'pending' && (
                  <select
                    onChange={(e) => updateWaiterRequestStatus(req.id, 'in_progress', e.target.value)}
                    defaultValue=""
                    className="text-xs py-2 px-3 rounded-xl border border-amber-300 bg-white text-brandText font-semibold cursor-pointer"
                  >
                    <option value="" disabled>Assign Captain...</option>
                    {staffMembers.map(staff => (
                      <option key={staff} value={staff}>{staff}</option>
                    ))}
                  </select>
                )}

                {req.status === 'in_progress' && (
                  <button
                    onClick={() => updateWaiterRequestStatus(req.id, 'completed')}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-soft transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Resolved</span>
                  </button>
                )}

                {req.status !== 'completed' && (
                  <button
                    onClick={() => cancelWaiterRequest(req.id)}
                    className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
                    title="Dismiss / Cancel"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
