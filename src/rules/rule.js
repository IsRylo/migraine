function predict(Age, Frequency, Location, Character, Intensity, Photophobia, Visual, Sensory, Dysphasia, Vertigo, Tinnitus, Hypoacusis, Defect, DPF) {
    if (Visual <= 0.5) {
        if (Sensory <= 0.5) {
            if (Intensity <= 2.5) {
                return [0, 0, 0, 0, 2, 0, 0];
            } else // if Intensity > 2,5 {
                if (Character <= 1.5) {
                    if (Tinnitus <= 0.5) return [0, 0, 45, 0, 0, 0, 0];
                    else return [1, 0, 0, 0, 0, 0, 0] // if Tinnitus > 0,5     
                } else return [0, 0, 0, 2, 0, 0, 0]; // if Character > 1,5 
        } else { // if Sensory > 0,5 {
            if (Hypoacusis <= 0.5) {
                if (Location <= 1.5) return [0, 0, 0, 0, 0, 6, 0];
                else return [0, 0, 0, 1, 0, 0, 0]; // if Location > 1,5 
            } else return [1, 0, 0, 0, 0, 0, 0]; // if Hypoacusis > 0,5 
        }
    } else { // if Visual > 0,5 {
        if (Character <= 0.5) {
            return [0, 0, 0, 0, 0, 0, 15];
        } else { // if Character > 0,5 {
            if (Vertigo <= 0.5) {
                if (Tinnitus <= 0.5) {
                    if (Location <= 1.5) {
                        if (Dysphasia <= 0.5) {
                            if (Intensity <= 1.5) {
                                if (Visual <= 1.5) return [0, 2, 0, 0, 0, 0, 0];
                                else { // if Visual > 1,5 {
                                    if (Sensory <= 0, 5) return [0, 0, 0, 0, 0, 1, 0];
                                    else return [0, 0, 0, 0, 1, 0, 0]; // if Sensory > 0,5 {
                                }
                            } else { // if Intensity > 1,5 {
                                if (DPF <= 0.5) {
                                    if (Sensory <= 0.5) {
                                        return [0, 0, 0, 0, 0, 96, 0];
                                    } else return [0, 0, 0, 0, 1, 18, 0]; // if Sensory > 0,5 {
                                } else { // if DPF > 0,5 {
                                    if (Age <= 27, 5) return [0, 6, 0, 0, 0, 16, 0];
                                    else return [0, 0, 0, 0, 0, 42, 0]; // if Age > 27,5 {
                                }
                            }
                        } else { // if Dysphasia > 0,5 {
                            if (Age <= 20.5) {
                                if (DPF <= 0.5) return [0, 0, 0, 0, 0, 1, 0];
                                else return [0, 1, 0, 0, 0, 0, 0]; // if DPF > 0,5 {
                            } else return [0, 0, 0, 0, 2, 0, 0]; // if Age > 20,5      
                        }
                    } else return [0, 0, 0, 3, 0, 0, 0]; // if Location > 1,5 {
                } else { // if Tinnitus > 0,5 {
                    if (Frequency <= 1.5) {
                        if (Character <= 1.5) {
                            return [0, 3, 0, 0, 0, 0, 0];
                        } else return [0, 0, 0, 1, 0, 0, 0]; // if Character > 1,5 {
                    } else { // if Frequency > 1,5 {
                        if (DPF <= 0.5) return [0, 0, 0, 0, 2, 0, 0];
                        else return [2, 0, 0, 0, 0, 0, 0]; // if DPF > 0,5 {
                    }
                }
            } else { // if Vertigo > 0,5 {
                if (Defect <= 0.5) {
                    if (Age <= 30.5) {
                        if (DPF <= 0.5) {
                            return [0, 0, 0, 0, 3, 0, 0];
                        } else { // if DPF > 0,5 {
                            if (Photophobia <= 0.5) {
                                return [0, 0, 0, 1, 0, 0, 0];
                            } else { // if Photophobia > 0,5 {
                                if (Sensory <= 1.0) {
                                    return [0, 5, 0, 0, 0, 0, 0];
                                } else { // if Sensory > 1,0 {
                                    if (Frequency <= 1.5) return [0, 0, 0, 0, 0, 1, 0];
                                    else return [0, 1, 0, 0, 0, 0, 0]; // if Frequency > 1,5 
                                }
                            }
                        }
                    } else { // if Age > 30,5 {
                        if (Frequency <= 3.5) {
                            if (Age <= 39.5) {
                                if (DPF <= 0.5) return [0, 0, 0, 1, 0, 0, 0];
                                else return [3, 0, 0, 0, 0, 0, 0]; // if DPF > 0,5 {
                            } else return [0, 0, 0, 3, 0, 0, 0]; // if Age > 39,5 {
                        } else { // if Frequency > 3,5 {
                            if (Character <= 1.5) return [0, 0, 0, 0, 0, 4, 0];
                            else return [0, 0, 0, 1, 0, 0, 0]; // if Character > 1,5 
                        }
                    }
                } else return [6, 0, 0, 0, 0, 0, 0]; // if Defect > 0,5 
            }
    
        }
    }
}

function getClass(Age, Frequency, Location, Character, Intensity, Photophobia, Visual, Sensory, Dysphasia, Vertigo, Tinnitus, Hypoacusis, Defect, DPF) {
    classes = ['Basilar-type aura', 'Familial hemiplegic migraine', 'Migraine without aura', 'Other', 'Sporadic hemiplegic migraine', 'Typical aura with migraine', 'Typical aura without migraine']
    result = predict(Age, Frequency, Location, Character, Intensity, Photophobia, Visual, Sensory, Dysphasia, Vertigo, Tinnitus, Hypoacusis, Defect, DPF);
    index = result.indexOf(Math.max(...result));
    return "Migraine class: " + classes[index] +  " with total cases of: " + result[index];
}

// console.log(getClass(37, 1, 1, 1, 3, 1, 1, 0, 0, 1, 0, 0, 0, 1)); Contoh penggunaan