Orders = new Meteor.Collection('orders', {connection: null});

Schemas.step1 = new SimpleSchema({
  FirstName: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  MiddleInitial: {
    type: String,
    optional: true,
    max: 1,
    autoform: {
      'class':'four wide field',
      afFieldInput: {
        type: "text"
      }
    }
  },
  LastName: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  Age: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  DateOfBirth: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  SSN: {
    type: String,
    label: "SSN",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  Height: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  Weight: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  PurposeOfExamination: {
    type: [String],
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Enlistment", value: "0"},
          {label: "Commission", value: "1"},
          {label: "Retention", value: "2"},
          {label: "U.S. Service Academy", value: "3"},
          {label: "ROTC Scholarship", value: "4"},
          {label: "Other", value: "5"}
        ];
      }
    }
  }
});
Schemas.step2 = new SimpleSchema({
  eyes: {
    type: [String],
    label: "Check any for medical history with (eyes)",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Double vision", value: "0"},
          {label: "Detached retina or surgery to repair a detached retina", value: "1"},
          {label: "Cataracts or surgery for cataracts", value: "2"},
          {label: "Eye surgery to improve vision (RK, PRK, LASIK, etc.)", value: "3"},
          {label: "Night blindness", value: "4"},
          {label: "Strabismus or 'lazy eye' or any surgery to correct these", value: "5"},
          {label: "Any other eye condition, injury or surgery", value: "6"}
        ];
      }
    }
  },
  vision: {
    type: [String],
    label: "Check any for medical history with (vision)",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Worn/wear contact lenses or glasses", value: "0"},
          {label: "Loss of vision in either eye", value: "1"},
          {label: "Color vision deficiency or color blindness", value: "2"}
        ];
      }
    }
  },
  ears: {
    type: [String],
    label: "Check any for medical history with (ears)",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Perforated ear drum or tubes in ear drum(s)", value: "0"},
          {label: "Ear surgery, to include mastoidectomy or repair of perforated ear drum", value: "1"},
          {label: "Loss of balance or vertigo", value: "2"}
        ];
      }
    }
  },
  hearing: {
    type: [String],
    label: "Check any for medical history with (hearing)",
    optional: true,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Perforated ear drum or tubes in ear drum(s)", value: "0"},
          {label: "Ear surgery, to include mastoidectomy or repair of perforated ear drum", value: "1"},
          {label: "Loss of balance or vertigo", value: "2"}
        ];
      }
    }
  }

});

Schemas.step3 = new SimpleSchema({
  Comments: {
    type: String,
    label: "Explain all 'Yes' answers to questions from the Medical History Section",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  }
});

Schemas.step4 = new SimpleSchema({
  Physician: {
    type: String,
    label: "Current Primary Care Physician Name",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  }
});


Schemas.step5 = new SimpleSchema({
  Terms: {
     type: Boolean,
     label: 'I accept the terms and conditions.',
     autoform: {
       label: false
     }
   }
});

Schemas.step6 = new SimpleSchema({

});

// Schemas.paymentInformation = new SimpleSchema({
//   paymentMethod: {
//     type: String,
//     label: 'Payment method',
//     allowedValues: ['credit-card', 'bank-transfer'],
//     autoform: {
//       options: [{
//         label: 'Credit card',
//         value: 'credit-card'
//       }, {
//         label: 'Bank transfer',
//         value: 'bank-transfer'
//       }]
//     }
//   },
//   acceptTerms: {
//     type: Boolean,
//     label: 'I accept the terms and conditions.',
//     autoform: {
//       label: false
//     },
//     autoValue: function() {
//       if (this.isSet && this.value !== true) {
//         this.unset();
//       }
//     }
//   }
// });

Orders.attachSchema([
  Schemas.step1,
  Schemas.step2,
  Schemas.step3,
  Schemas.step4,
  Schemas.step5,
  Schemas.step6

]);

Template.basic.helpers({
  steps: function() {
    return [{
      id: 'step1',
      title: 'Applicant',
      schema: Schemas.step1,
      template: 'applicant',
      formId: 'applicant-id'
    },
    {
      id: 'step2',
      title: 'Medical History',
      schema: Schemas.step2
    },
    {
      id: 'step3',
      title: "Application Comments",
      schema: Schemas.step3
    },
    {
      id: 'step4',
      title: 'HealthCare and Insurance',
      schema: Schemas.step4,
      template: 'contact',
      formId: 'contact-id'
    },
    {
      id: 'step5',
      title: 'Authorization',
      schema: Schemas.step5,
      template:'authorization',
      formId: 'authorization-id'

    },
    {
      id: 'step6',
      title: 'Review',
      schema: Schemas.step6,
      template:"review",
      formId:"review-id",
      onSubmit: function(data, wizard) {
        var self = this;
        console.log(wizard.mergedData());
        Orders.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
            self.done();
          } else {
            Router.go('viewLead', {
              _id: id
            });
          }
        });
      }
    }];
  }
});

Wizard.useRouter('iron:router');

Router.route('/basic/:step?', {
  name: 'basic',
  onBeforeAction: function() {
    if (!this.params.step) {
      this.redirect('basic', {
        step: 'step1'
      });
    } else {
      this.next();
    }
  }
});

Router.route('/orders/:_id', {
  name: 'viewLead',
  template: 'viewLead',
  data: function() {
    return Orders.findOne(this.params._id);
  }
});
