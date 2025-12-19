import { X, Rocket, Shield, User, Building, Mail, Phone } from "lucide-react";
import API from '../../services/api';

const FreeTrialForm = ({
  showTrialForm,
  setShowTrialForm,
  trialFormData,
  setTrialFormData,
  handleTrialFormSubmit: propHandleSubmit,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to submit free trial request
      const response = await API.submitFreeTrial(trialFormData); 
      console.log('Free trial request submitted:', response);

      // Reset form
      setTrialFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        employees: '',
        timeline: '',
        interested_in: '',
      });

      // Close modal
      setShowTrialForm(false);

      // Optional: parent ka handler bhi call karo (analytics, etc.)
      if (propHandleSubmit) {
        propHandleSubmit(e);
      }

    } catch (error) {
      console.error('Error submitting free trial:', error);

      let errorMsg = 'Failed to start free trial. Please try again.';

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.response?.status) {
        errorMsg = `Server error: ${error.response.status}`;
      } else if (!navigator.onLine) {
        errorMsg = 'No internet connection. Please check your network.';
      }

      alert(errorMsg);
    }
  };

  return (
    showTrialForm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl max-h-[95vh] overflow-y-auto">
          <button
            onClick={() => setShowTrialForm(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Rocket className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Start Your Free Trial
            </h3>
            <p className="text-gray-600">
              14-day free trial • No credit card required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={trialFormData.name}
                    onChange={(e) => setTrialFormData({ ...trialFormData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={trialFormData.company}
                    onChange={(e) => setTrialFormData({ ...trialFormData, company: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={trialFormData.email}
                    onChange={(e) => setTrialFormData({ ...trialFormData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="abc@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    value={trialFormData.phone}
                    onChange={(e) => setTrialFormData({ ...trialFormData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Company Size & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                <select
                  required
                  value={trialFormData.employees}
                  onChange={(e) => setTrialFormData({ ...trialFormData, employees: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                <select
                  required
                  value={trialFormData.timeline}
                  onChange={(e) => setTrialFormData({ ...trialFormData, timeline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </div>

            {/* Interested In */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interested In *</label>
              <select
                required
                value={trialFormData.interested_in}
onChange={(e) => setTrialFormData({ ...trialFormData, interested_in: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Product</option>
                <option value="CRM Pro">CRM Pro</option>
                <option value="Inventory & Production ERP">Inventory & Production ERP</option>
                <option value="School ERP">School ERP</option>
                <option value="Analytics Dashboard">Analytics Dashboard</option>
                <option value="SecureVault">SecureVault</option>
                <option value="ProjectFlow">ProjectFlow</option>
                <option value="MarketInsight">MarketInsight</option>
                <option value="multiple">Multiple Products</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Start Free Trial
            </button>
          </form>

          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>Your data is secure and private</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              No commitment • Cancel anytime • Full support included
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default FreeTrialForm;