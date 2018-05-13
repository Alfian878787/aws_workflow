// Script to plot the result.
x = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
y = [0.1765, 0.1699, 0.169, 0.181, 0.1768, 0.2277, 0.2354, 0.211, 0.2368, 0.2778, 0.3223, 0.3128, 0.3303,0.3749,0.3893,0.3935,0.4217,0.4982,0.4821,0.5099];
y2 = [0.2145, 0.2832, 0.3118, 0.3144, 0.3287, 0.4288, 0.4387, 0.404, 0.4726, 0.5641, 0.5535, 0.5045, 0.6566, 0.7206, 0.7327, 0.7574, 0.8341, 0.7938, 0.7829, 0.8021];
p=polyfit(x,y,4);  
p2 = polyfit(x,y2,2);
x1=linspace(min(x),max(x));  
y1=polyval(p,x1);  
y_2=polyval(p2,x1);
plot(x1,y1, x1, y_2);
title('Lambda Function Autoscale');
legend('Average Respond','Slowest Respond','Location','northwest');
xlabel('Concurrent Number');
ylabel('Respond Time / Second');
set(gca,'color',[0.953 0.953 0.953]);
set(gcf,'color',[0.953 0.953 0.953])