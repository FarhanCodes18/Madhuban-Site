import React, { useState } from 'react';
import {
  Users,
  Clock,
  Award,
  DollarSign,
  Phone,
  CheckCircle2,
  Coffee,
  XCircle,
  Calendar
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function StaffManagement() {
  const { staff, updateStaffAttendance } = useDemoRestaurant();
  const [filterShift, setFilterShift] = useState('all');

  const filteredStaff = staff.filter(s => {
    if (filterShift === 'all') return true;
    return s.shift.toLowerCase().includes(filterShift.toLowerCase());
  });

  const totalPayroll = staff.reduce((acc, s) => acc + s.salary, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <Users className="w-7 h-7 text-forest" />
            <span>Staff Roster, Shifts & Payroll</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Manage culinary team, floor captains, shift schedules, and monthly remuneration.
          </p>
        </div>

        <div className="text-xs font-semibold text-forest bg-white px-4 py-2 rounded-2xl border border-pastel shadow-soft-sm">
          Active Floor Roster: <span className="font-bold">{staff.filter(s => s.attendance === 'present').length} / {staff.length} On Duty</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Total Monthly Payroll</span>
          <h3 className="font-playfair text-3xl font-bold text-brandText">₹{totalPayroll.toLocaleString()}</h3>
          <p className="text-[11px] text-brandText-muted">Salaries across 7 core staff</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Active Culinary Staff</span>
          <h3 className="font-playfair text-3xl font-bold text-forest">{staff.filter(s => s.attendance === 'present').length} Present</h3>
          <p className="text-[11px] text-emerald-700 font-semibold">100% station coverage</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Staff Average Rating</span>
          <h3 className="font-playfair text-3xl font-bold text-gold-dark">4.90 / 5.0</h3>
          <p className="text-[11px] text-brandText-muted">Based on verified guest dining feedback</p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-pastel shadow-soft p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel pb-4">
          <h3 className="font-playfair font-bold text-lg text-brandText">
            Team Schedule & Attendance Status
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            {['all', 'Morning', 'Evening', 'Full Day'].map(sh => (
              <button
                key={sh}
                onClick={() => setFilterShift(sh)}
                className={`px-3 py-1.5 rounded-xl font-bold transition border ${
                  filterShift === sh
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
                }`}
              >
                {sh}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pastel/40 border-b border-pastel text-forest font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Staff Member</th>
                <th className="p-3">Designation / Role</th>
                <th className="p-3">Shift Schedule</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Orders Handled</th>
                <th className="p-3">Monthly Pay</th>
                <th className="p-3 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel/40">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-pastel/10 transition">
                  <td className="p-3">
                    <p className="font-playfair font-bold text-sm text-brandText">{member.name}</p>
                    <p className="text-[11px] text-brandText-muted">{member.phone}</p>
                  </td>

                  <td className="p-3 font-semibold text-brandText">
                    {member.role}
                  </td>

                  <td className="p-3 text-brandText-muted">
                    {member.shift}
                  </td>

                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      member.attendance === 'present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : member.attendance === 'on_break'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {member.attendance.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-3 font-mono font-bold text-forest">
                    {member.ordersHandled} orders
                  </td>

                  <td className="p-3 font-dmsans font-bold text-brandText">
                    ₹{member.salary.toLocaleString()}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => updateStaffAttendance(member.id, 'present')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold ${
                          member.attendance === 'present' ? 'bg-emerald-700 text-cream' : 'bg-bgLight text-brandText hover:bg-pastel'
                        }`}
                        title="Mark Present"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateStaffAttendance(member.id, 'on_break')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold ${
                          member.attendance === 'on_break' ? 'bg-amber-600 text-cream' : 'bg-bgLight text-brandText hover:bg-pastel'
                        }`}
                        title="Mark Break"
                      >
                        <Coffee className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateStaffAttendance(member.id, 'on_leave')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold ${
                          member.attendance === 'on_leave' ? 'bg-rose-600 text-cream' : 'bg-bgLight text-brandText hover:bg-pastel'
                        }`}
                        title="Mark Leave"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
