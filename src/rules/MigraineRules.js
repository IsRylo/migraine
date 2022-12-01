export default function predict({Age=0, Frequency=0, Location=0, Character=0, Intensity=0, Photophobia=0, Visual=0, Sensory=0, Dysphasia=0, Vertigo=0, Tinnitus=0, Hypoacusis=0, Defect=0, DPF=0}) {
    if (Visual <= 0.5) {
        if (Sensory <= 0.5) {
            if (Intensity <= 2.5) {
                return [[0, 0, 0, 0, 2, 0, 0], 2/2];
            } else // if Intensity > 2,5 {
                if (Character <= 1.5) {
                    if (Tinnitus <= 0.5) return [[0, 0, 45, 0, 0, 0, 0], 45/45];
                    else return [[1, 0, 0, 0, 0, 0, 0], 1/1] // if Tinnitus > 0,5     
                } else return [[0, 0, 0, 2, 0, 0, 0], 2/2]; // if Character > 1,5 
        } else { // if Sensory > 0,5 {
            if (Hypoacusis <= 0.5) {
                if (Location <= 1.5) return [[0, 0, 0, 0, 0, 6, 0], 6/6];
                else return [[0, 0, 0, 1, 0, 0, 0], 1/1]; // if Location > 1,5 
            } else return [[1, 0, 0, 0, 0, 0, 0], 1/1]; // if Hypoacusis > 0,5 
        }
    } else { // if Visual > 0,5 {
        if (Character <= 0.5) {
            return [[0, 0, 0, 0, 0, 0, 15], 15/15];
        } else { // if Character > 0,5 {
            if (Vertigo <= 0.5) {
                if (Tinnitus <= 0.5) {
                    if (Location <= 1.5) {
                        if (Dysphasia <= 0.5) {
                            if (Intensity <= 1.5) {
                                if (Visual <= 1.5) return [[0, 2, 0, 0, 0, 0, 0], 2/2];
                                else { // if Visual > 1,5 {
                                    if (Sensory <= 0, 5) return [0, 0, 0, 0, 0, 1, 0], 1/1;
                                    else return [[0, 0, 0, 0, 1, 0, 0], 1/1]; // if Sensory > 0,5 {
                                }
                            } else { // if Intensity > 1,5 {
                                if (DPF <= 0.5) {
                                    if (Sensory <= 0.5) {
                                        return [[0, 0, 0, 0, 0, 96, 0], 96/96];
                                    } else return [[0, 0, 0, 0, 1, 18, 0], 18/19]; // if Sensory > 0,5 {
                                } else { // if DPF > 0,5 {
                                    if (Age <= 27, 5) return [[0, 6, 0, 0, 0, 16, 0], 16/22];
                                    else return [[0, 0, 0, 0, 0, 42, 0], 42/42]; // if Age > 27,5 {
                                }
                            }
                        } else { // if Dysphasia > 0,5 {
                            if (Age <= 20.5) {
                                if (DPF <= 0.5) return [[0, 0, 0, 0, 0, 1, 0], 1/1];
                                else return [[0, 1, 0, 0, 0, 0, 0], 1/1]; // if DPF > 0,5 {
                            } else return [[0, 0, 0, 0, 2, 0, 0], 2/2]; // if Age > 20,5      
                        }
                    } else return [0, 0, 0, 3, 0, 0, 0], 3/3; // if Location > 1,5 {
                } else { // if Tinnitus > 0,5 {
                    if (Frequency <= 1.5) {
                        if (Character <= 1.5) {
                            return [[0, 3, 0, 0, 0, 0, 0], 3/3];
                        } else return [[0, 0, 0, 1, 0, 0, 0], 1/1]; // if Character > 1,5 {
                    } else { // if Frequency > 1,5 {
                        if (DPF <= 0.5) return [[0, 0, 0, 0, 2, 0, 0], 2/2];
                        else return [[2, 0, 0, 0, 0, 0, 0], 2/2]; // if DPF > 0,5 {
                    }
                }
            } else { // if Vertigo > 0,5 {
                if (Defect <= 0.5) {
                    if (Age <= 30.5) {
                        if (DPF <= 0.5) {
                            return [[0, 0, 0, 0, 3, 0, 0], 3/3];
                        } else { // if DPF > 0,5 {
                            if (Photophobia <= 0.5) {
                                return [[0, 0, 0, 1, 0, 0, 0], 1/1];
                            } else { // if Photophobia > 0,5 {
                                if (Sensory <= 1.0) {
                                    return [[0, 5, 0, 0, 0, 0, 0], 5/5];
                                } else { // if Sensory > 1,0 {
                                    if (Frequency <= 1.5) return [[0, 0, 0, 0, 0, 1, 0], 1/1];
                                    else return [[0, 1, 0, 0, 0, 0, 0], 1/1]; // if Frequency > 1,5 
                                }
                            }
                        }
                    } else { // if Age > 30,5 {
                        if (Frequency <= 3.5) {
                            if (Age <= 39.5) {
                                if (DPF <= 0.5) return [0, 0, 0, 1, 0, 0, 0], 1/1;
                                else return [3, 0, 0, 0, 0, 0, 0], 3/3; // if DPF > 0,5 {
                            } else return [0, 0, 0, 3, 0, 0, 0], 3/3; // if Age > 39,5 {
                        } else { // if Frequency > 3,5 {
                            if (Character <= 1.5) return [0, 0, 0, 0, 0, 4, 0], 4/4;
                            else return [[0, 0, 0, 1, 0, 0, 0], 1/1]; // if Character > 1,5 
                        }
                    }
                } else return [[6, 0, 0, 0, 0, 0, 0], 6/6]; // if Defect > 0,5 
            }
    
        }
    }
}
